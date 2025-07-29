import express from "express";
import { Router } from "express";
import { stripe } from "../stripe";
import { PrismaClient } from "@prisma/client";
import { validateUser } from "../Middlewares/entries.middleware";
import { Request, Response } from "express";
const router = Router();
const prisma = new PrismaClient();

router.post("/create-checkout-session", validateUser, async (req:Request, res:Response) => {
  const { id } = req.user;
  const { packageType } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).json({ error: "User not found" });

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.useremail,
        metadata: { id },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id },
        data: { stripeCustomerId: customerId },
      });
    }

    type PackageType = "pro" | "enterprise";

    const priceMap: Record<PackageType, string> = {
      pro: process.env.STRIPE_PRO_PRICE_ID!,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    };
    
  
    if (!packageType || !priceMap[packageType as PackageType]) {
      return res.status(400).json({ error: "Invalid package type" });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceMap[packageType as PackageType], 
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard/success`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/cancel`,
      metadata: { id, packageType },
    });

  return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Stripe session failed" });
  }
});

router.post("/free-tier",validateUser,async (req:Request, res:Response) => {

  const {id}=req.user
  const { packageType } = req.body;
  try {
    
    await prisma.user.update({
      where:{id},
      data:{package:packageType}
    })
    return res.status(200).json({ message:"Updated subscription package" });
  } catch (error) {
   return res.status(500).json({ message: "Subscription Change failed" });
  }
})

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const userId = session.metadata.id;
      const packageType = session.metadata.packageType;

      await prisma.user.update({
        where: { id:userId},
        data: {
          package: packageType,
          subscriptionEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
        },
      });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(err);
     return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }
});

export default router;

import express from "express";
import { Router } from "express";
import { stripe } from "../stripe";
import { PrismaClient } from "@prisma/client";
import { validateUser } from "../Middlewares/entries.middleware";

const router = Router();
const prisma = new PrismaClient();

router.post("/create-checkout-session", validateUser, async (req, res) => {
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

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

export default router;

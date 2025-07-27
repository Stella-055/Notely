import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile: Profile, done) {
      try {
        console.log(profile._json);

        const existingUser = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        const username = `${profile.name?.givenName}${profile.id.slice(0, 3)}`;

        const googleId = profile.id;

        const useremail = profile.emails?.[0].value!;
        const firstname = profile.name?.givenName! || "No first name";
        const lastname = profile.name?.familyName! || "No last name";
        const newUser = await prisma.user.create({
          data: { username, googleId, firstname, lastname, useremail },
        });
        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    },
  ),
);

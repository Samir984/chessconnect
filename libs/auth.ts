import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    authorized({ auth }) {
      console.log("auth callback", auth);
      return !!auth?.user;
    },
    async signIn({ user }) {
      console.log("signin callback", user);

      try {
        const userExits = await prisma.user.findUnique({
          where: { email: user?.email as string },
        });
        if (!userExits) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email as string,
              fullName: user.name as string,
            },
          });
          console.log("user created \n\n\n");
        }
        return true;
      } catch (error) {
        console.log(error, "\n\n\n");
        return false;
      }
    },
    async jwt({ token }) {
      console.log("jwt callback /n/n");
      // const user = await prisma.user.findUnique({
      //   where: { email: token?.email as string },
      // });
      // token.userId = user?.id;
      return token;
    },
    async session({ session, token }) {
      console.log("session callback");
      // session.user.userId = token.userId;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export const runtime = "nodejs";

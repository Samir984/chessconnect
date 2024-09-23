import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string; // Only extending the userId field
    } & DefaultSession["user"]; // This keeps other default fields (like name and email)
  }

  interface User {
    userId: string; // Only extending the userId field
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string; // Only extending the userId field
  }
}

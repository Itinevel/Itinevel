import NextAuth from "next-auth";

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      roles: string[]; // Add your custom roles field here
    };
  }

  interface User {
    id: string;
    roles: string[]; // Add your custom roles field here
  }
}
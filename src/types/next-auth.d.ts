import "next-auth";

enum ROLE {
  USER,
  ADMIN,
}

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    role?: ROLE;
  }

  interface Session {
    user: {
      id?: string;
      isVerified?: boolean;
      username?: string;
      role?: ROLE;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isVerified?: boolean;
    username?: string;
    role?: ROLE;
  }
}

import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiEndpoints } from "@/api-calls/endpoints";
import { api } from "@/api-calls/axios";

interface ExtendedUser extends User {
  accessToken: string;
  name: string;
  email: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const response = await api.post(
            apiEndpoints.account.authenticate,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const data = response.data;

          return {
            id: data.data.accountId,
            accessToken: data.data.accessToken,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.accessToken = u.accessToken
      }
      return token;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.name = user.name;
        session.user.email = user.email;
      }
      return session;
    }
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

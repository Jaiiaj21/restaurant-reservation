import userLogin from "@/libs/userLogIn";
import { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({

      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials) return null

        const user = await userLogin(credentials.email, credentials.password)
        if (user) {
          console.log(user)
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  }
}

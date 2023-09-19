import { LoginResponse } from "@/interfaces/LoginResponse";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        cidusuario: {
          label: "cidusuario",
          type: "text",
          placeholder: "45784578@gmail.com",
        },
        ccpassword: {
          label: "ccpassword",
          type: "text",
          placeholder: "************",
        },
        login: {
          label: "text",
          type: "text",
          placeholder: "************",
        },
        ide_eje: {
          label: "number",
          type: "number",
          placeholder: "************",
        },
      },

      async authorize(credentials) {
        const res = await fetch(
          "https://api.pagosvirtualesperu.com/siam/usuarios/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const user: LoginResponse | any = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

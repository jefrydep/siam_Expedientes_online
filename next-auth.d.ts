import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */

      ide_sol: number;
      ide_per: number;
      ano_eje: string;
      nro_sol: string;
      fch_sol: Date;
      nro_doc: string;
      fch_nac: Date;
      cel_001: string;
      cel_002: string;
      cor_ele: string;
      nom_com: string;
      type_login: string;
      access_token: string;
    };
  }
}

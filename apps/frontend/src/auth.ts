import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@db/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: 'jwt' },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === 'update' && session?.color) {
        token.color = session.color;
      }
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        // @ts-ignore
        token.numericId = user.numericId;
        // @ts-ignore
        token.handle = user.handle;
        // @ts-ignore
        token.profilePicture = user.profilePicture;
        // @ts-ignore
        token.color = user.color;
        // @ts-ignore
        token.isMod = user.isMod;
      }

      if (trigger === 'signUp') {
        // const [key, country] = process.env.MAILCHIMP_API_KEY!.split("-");
        // const [name, lastName] = user?.name?.split(" ")!;

        // await fetch(
        //   `https://${country}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
        //   {
        //     method: "POST",
        //     headers: {
        //       Authorization: `Basic ${Buffer.from("nevo:" + key).toString("base64")}`,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       email_address: user.email,
        //       status: "subscribed",
        //       merge_fields: {
        //         FNAME: name || "",
        //         LNAME: lastName || "",
        //       },
        //     }),
        //   },
        // );

        const { login, avatar_url } = await (
          await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${account?.access_token}`,
            },
          })
        ).json();

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            handle: login,
            profilePicture: avatar_url,
          },
        });

        // @ts-ignore
        token.handle = login;
        // @ts-ignore
        token.profilePicture = avatar_url;
      }

      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id;
      // @ts-ignore
      session.user.numericId = token.numericId;
      // @ts-ignore
      session.user.handle = token.handle;
      // @ts-ignore
      session.user.profilePicture = token.profilePicture;
      // @ts-ignore
      session.user.color = token.color;
      // @ts-ignore
      session.user.isMod = token.isMod;
      return session;
    },
    authorized: async ({ auth, request }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      if (!auth && request.url.indexOf('/api') > -1) {
        return Response.json(
          { message: 'You have to login' },
          {
            status: 401,
          }
        );
      }
      if (!auth) {
        return Response.redirect(new URL('/', request.url));
      }

      return true;
    },
  },
});

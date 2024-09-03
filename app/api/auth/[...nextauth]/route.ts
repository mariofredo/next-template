import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username',
        },
        password: {label: 'Password', type: 'password'},
      },

      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export {handler as GET, handler as POST};

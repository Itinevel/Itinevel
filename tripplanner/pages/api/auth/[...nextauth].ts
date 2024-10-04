import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        // If login is successful and user data is returned
        if (res.ok && user) {
          return user; // Return the user object to be included in the JWT
        } else {
          return null; // Return null to indicate failed authentication
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // On login, set the token with the user's id and roles
      if (user) {
        token.id = user.id;
        token.roles = user.roles;  // Pass roles if available
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user id and roles to the session object
      session.user.id = token.id as string;
      session.user.roles = token.roles as string[];
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect to custom login page
  },
});

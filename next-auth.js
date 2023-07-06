import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { verifyPassword } from "../../../utils/auth";
// import { getUserByEmail } from "../../../utils/db";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // Retrieve the user from the database by email
        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("No user found");
        }

        // Verify the password
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return user object if authentication is successful
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.sub = user.id;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user;
      return Promise.resolve(session);
    },
  },
  secret: "your-secret-key",
};

export default (req, res) => NextAuth(req, res, options);

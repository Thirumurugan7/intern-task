import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../utils/auth";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { Email, password } = credentials;

        // Verify the username and password
        const isValid = await verifyPassword(Email, password);

        if (isValid) {
          // Return the user object if authentication is successful
          return Promise.resolve({ Email });
        } else {
          // Return null or throw an error if authentication fails
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.Email = user.Email;
      }
      return Promise.resolve(token);
    },
  },
  secret: "your-secret-key",
};

export default (req, res) => NextAuth(req, res, options);

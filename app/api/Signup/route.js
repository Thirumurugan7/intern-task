import { connectDB } from "@/utils/connectDb";

import Signup from "@/models/Register";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  const { Email, password, userName } = await req.json();
  console.log(userName, Email, password);
  console.log(Signup);
  try {
    await connectDB();
    const ExistingUser = await Signup.findOne({
      email: Email,
    });
    console.log(ExistingUser);
    if (ExistingUser) {
      return new Response("User already exists", {
        status: 402,
      });
    }

    const ExistingUserName = await Signup.findOne({
      username: userName,
    });
    console.log(ExistingUserName);
    if (ExistingUserName) {
      return new Response("username already exists", {
        status: 403,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Signup({
      username: userName,
      email: Email,
      password: password,
    });

    await newUser.save();
    console.log(newUser);

    return new Response("user successfully registered", {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("user not  registered due to some error", {
      status: 500,
    });
  }
};

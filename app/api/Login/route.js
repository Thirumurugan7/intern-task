import { connectDB } from "@/utils/connectDb";
import { NextResponse } from "next/server";

import Signup from "@/models/Register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  const { Email, password } = await req.json();
  console.log(Email, password);

  try {
    await connectDB();

    const userConfirm = await Signup.findOne({
      email: Email,
      password: password,
    });

    if (userConfirm) {
      const token = jwt.sign(
        { email: Email },
        "Harry-potter-is-the-chosen-one",
        { expiresIn: "0.2h" }
      );
      console.log(token);
      //   return res.status(200).json({ token });
      return NextResponse.json({
        message: "success",
        status: 200,
        data: token,
      });
    } else {
      return new Response("user is not found", {
        status: 401,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

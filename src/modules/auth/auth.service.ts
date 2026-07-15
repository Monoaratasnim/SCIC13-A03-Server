import bcrypt from "bcrypt";

import User from "./auth.model";
import { createToken } from "../../utils/jwt";

import {
  RegisterPayload,
  LoginPayload,
} from "./auth.types";

// ===============================
// Register User
// ===============================

export const registerUser = async (
  payload: RegisterPayload
) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: payload.role || "user",
  });

  const token = createToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

// ===============================
// Login User
// ===============================

export const loginUser = async (
  payload: LoginPayload
) => {

  const user = await User.findOne({
    email: payload.email,
  });


  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }



  // Google users do not have password
  if (!user.password) {
    throw new Error(
      "This account uses Google login"
    );
  }



  const isPasswordValid =
    await bcrypt.compare(
      payload.password,
      user.password
    );



  if (!isPasswordValid) {
    throw new Error(
      "Invalid email or password"
    );
  }



  const token = createToken({

    id: user._id.toString(),

    email: user.email,

    role: user.role,

  });



  return {

    user: {

      id: user._id.toString(),

      name: user.name,

      email: user.email,

      role: user.role,

    },

    token,

  };

};
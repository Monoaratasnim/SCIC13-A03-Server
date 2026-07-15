import { Types } from "mongoose";

declare global {
  namespace Express {

    interface User {

      _id: Types.ObjectId | string;

      name?: string;

      email: string;

      role:
      | "user"
      | "owner"
      | "admin";

      avatar?: string;

    }

  }
}

export {};
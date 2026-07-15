import User from "../auth/auth.model";

import {
  UpdateRolePayload,
} from "./user.types";

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getAllUsers = async (
  page:number,
  limit:number
) => {


  const skip =
    (page - 1) * limit;


  const users =
    await User.find()
      .select("-password")
      .sort({
        createdAt:-1,
      })
      .skip(skip)
      .limit(limit);



  const totalUsers =
    await User.countDocuments();



  return {

    users,

    pagination:{

      page,

      limit,

      totalUsers,

      totalPages:
        Math.ceil(
          totalUsers / limit
        ),

    }

  };


};



/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

export const getUserById = async (
  id: string
) => {

  const user =
    await User.findById(id)
      .select("-password");

  if (!user) {

    throw new Error(
      "User not found"
    );

  }

  return user;

};



/*
|--------------------------------------------------------------------------
| Update User Role
|--------------------------------------------------------------------------
*/

export const updateUserRole = async (

  id: string,

  payload: UpdateRolePayload

) => {

  const user =
    await User.findById(id);

  if (!user) {

    throw new Error(
      "User not found"
    );

  }

  user.role = payload.role;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

};



/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

export const deleteUser = async (
  id: string
) => {

  const user =
    await User.findById(id);

  if (!user) {

    throw new Error(
      "User not found"
    );

  }

  await User.findByIdAndDelete(id);

  return {
    message:
      "User deleted successfully",
  };

};
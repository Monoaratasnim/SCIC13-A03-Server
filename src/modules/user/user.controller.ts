import { Request, Response } from "express";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "./user.service";

import {
  updateRoleSchema,
} from "./user.validation";

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getAllUsersController = async (
  req: Request,
  res: Response
) => {

  try {

  const page =
 Number(req.query.page) || 1;


const limit =
 Number(req.query.limit) || 10;



const result =
 await getAllUsers(
   page,
   limit
 );

   res.status(200).json({

 success:true,

 message:"Users fetched successfully",

 data:result.users,

 pagination:
   result.pagination

});
  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch users",

    });

  }

};



/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

export const getUserByIdController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = String(req.params.id);

    const user =
      await getUserById(id);

    res.status(200).json({

      success: true,

      message:
        "User fetched successfully",

      data: user,

    });

  } catch (error: any) {

    res.status(404).json({

      success: false,

      message:
        error.message ||
        "User not found",

    });

  }

};



/*
|--------------------------------------------------------------------------
| Update User Role
|--------------------------------------------------------------------------
*/

export const updateUserRoleController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = String(req.params.id);

    const validatedData =
      updateRoleSchema.parse(
        req.body
      );

    const updatedUser =
      await updateUserRole(

        id,

        validatedData

      );

    res.status(200).json({

      success: true,

      message:
        "User role updated successfully",

      data: updatedUser,

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message:
        error.message ||
        "Failed to update role",

    });

  }

};



/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

export const deleteUserController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = String(req.params.id);

    const result =
      await deleteUser(id);

    res.status(200).json({

      success: true,

      message:
        result.message,

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message:
        error.message ||
        "Failed to delete user",

    });

  }

};
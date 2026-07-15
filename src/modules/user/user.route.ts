import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import adminMiddleware from "../../middleware/admin.middleware";
import {

  getAllUsersController,

  getUserByIdController,

  updateUserRoleController,

  deleteUserController,

} from "./user.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  authMiddleware,

  adminMiddleware,

  getAllUsersController

);

/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

router.get(

  "/:id",

  authMiddleware,

  adminMiddleware,

  getUserByIdController

);

/*
|--------------------------------------------------------------------------
| Update User Role
|--------------------------------------------------------------------------
*/

router.patch(

  "/:id/role",

  authMiddleware,

  adminMiddleware,

  updateUserRoleController

);

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

router.delete(

  "/:id",

  authMiddleware,

  adminMiddleware,

  deleteUserController

);

export default router;
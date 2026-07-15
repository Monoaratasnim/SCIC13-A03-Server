import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createProperty,
  getAllProperties,
  getSingleProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
} from "./property.service";

import {
  createPropertySchema,
  updatePropertySchema,
} from "./property.validation";

import uploadImage from "../../utils/uploadImage";

/*
|--------------------------------------------------------------------------
| Create Property
|--------------------------------------------------------------------------
*/

export const createPropertyController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const validatedData = createPropertySchema.parse(req.body);

    const files = req.files as Express.Multer.File[] | undefined;

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map((file) => uploadImage(file))
      );
    }

    const property = await createProperty(
      {
        ...validatedData,
        images: imageUrls,
      },
      req.user._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof ZodError
          ? error.issues
          : "Failed to create property",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Properties
|--------------------------------------------------------------------------
*/

export const getAllPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllProperties(req.query);

    return res.status(200).json({
      success: true,
      data: result.properties,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Property
|--------------------------------------------------------------------------
*/

export const getSinglePropertyController = async (
  req: Request,
  res: Response
) => {
  try {
    const property = await getSingleProperty(String(req.params.id));

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get My Properties
|--------------------------------------------------------------------------
*/

export const getMyPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const properties = await getMyProperties(req.user._id.toString());

    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Property
|--------------------------------------------------------------------------
*/

export const updatePropertyController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const validatedData = updatePropertySchema.parse(req.body);

    const property = await updateProperty(
      String(req.params.id),
      req.user._id.toString(),
      validatedData
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof ZodError
          ? error.issues
          : "Failed to update property",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Property
|--------------------------------------------------------------------------
*/

export const deletePropertyController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const property = await deleteProperty(
      String(req.params.id),
      req.user._id.toString()
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};
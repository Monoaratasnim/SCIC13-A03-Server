import { z } from "zod";


export const createPropertySchema = z.object({


  title: z
    .string()
    .min(
      5,
      "Title must be at least 5 characters"
    ),



  shortDescription: z
    .string()
    .min(
      10,
      "Short description must be at least 10 characters"
    )
    .max(
      150,
      "Short description cannot exceed 150 characters"
    ),



  description: z
    .string()
    .min(
      20,
      "Description must be at least 20 characters"
    ),





  propertyType: z.enum([

    "Apartment",

    "Villa",

    "Duplex",

    "Office",

    "Shop",

    "Warehouse",

    "Showroom",

    "Land",

  ]),





  category: z.enum([

    "Residential",

    "Commercial",

  ]),






  location: z
    .string()
    .min(
      2,
      "Location is required"
    ),






  price: z.coerce
    .number()
    .positive(
      "Price must be greater than 0"
    ),






  // Residential

  bedrooms: z.coerce
    .number()
    .optional(),



  bathrooms: z.coerce
    .number()
    .optional(),






  // Common

  area: z.coerce
    .number()
    .optional(),






  // Commercial Fields


  businessType: z
    .string()
    .optional(),



  floorNumber: z.coerce
    .number()
    .optional(),



  totalFloors: z.coerce
    .number()
    .optional(),



  parking: z
    .string()
    .optional(),



  lift: z
    .boolean()
    .optional(),



  electricityBackup: z
    .boolean()
    .optional(),



});








export const updatePropertySchema =

  createPropertySchema

    .partial()

    .extend({

      status: z
        .enum([

          "available",

          "sold",

        ])

        .optional(),

    });








export type CreatePropertyInput =

  z.infer<

    typeof createPropertySchema

  >;






export type UpdatePropertyInput =

  z.infer<

    typeof updatePropertySchema

  >;
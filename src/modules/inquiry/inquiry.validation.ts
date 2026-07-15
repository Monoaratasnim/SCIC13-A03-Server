import { z } from "zod";


/*
|--------------------------------------------------------------------------
| Create Inquiry Validation
|--------------------------------------------------------------------------
*/

export const createInquirySchema = z.object({

  property: z
    .string()
    .min(1, "Property ID is required"),



  message: z
    .string()
    .trim()
    .min(
      10,
      "Message must be at least 10 characters"
    )
    .max(
      500,
      "Message cannot exceed 500 characters"
    ),



  phone: z
    .string()
    .trim()
    .min(
      11,
      "Phone number is required"
    )
    .max(
      15,
      "Phone number is too long"
    ),

});



/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateInquiryInput =
  z.infer<typeof createInquirySchema>;
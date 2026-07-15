import Property from "./property.model";

import {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "./property.validation";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type CreatePropertyPayload = CreatePropertyInput & {
  images: string[];
};

/*
|--------------------------------------------------------------------------
| Create Property
|--------------------------------------------------------------------------
*/

export const createProperty = async (
  payload: CreatePropertyPayload,
  ownerId: string
) => {
  const property = await Property.create({
    ...payload,
    owner: ownerId,
  });

  return property;
};

/*
|--------------------------------------------------------------------------
| Get All Properties
| Search + Filter + Sort + Pagination
|--------------------------------------------------------------------------
*/



export const getAllProperties = async (
  query: any
) => {


  const {

    search,

    category,

    propertyType,

    minPrice,

    maxPrice,

    sort = "newest",

    page = "1",

    limit = "8",

  } = query;





  /*
  |--------------------------------------------------------------------------
  | Dynamic MongoDB Filter
  |--------------------------------------------------------------------------
  */


  const filter: any = {};







  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  if (search) {

    filter.$or = [

      {
        title: {
          $regex: search,
          $options: "i",
        },
      },


      {
        description: {
          $regex: search,
          $options: "i",
        },
      },


      {
        location: {
          $regex: search,
          $options: "i",
        },
      },

    ];

  }









  /*
  |--------------------------------------------------------------------------
  | Category Filter
  |--------------------------------------------------------------------------
  */

  if (category) {

    filter.category = category;

  }








  /*
  |--------------------------------------------------------------------------
  | Property Type Filter
  |--------------------------------------------------------------------------
  */

  if (propertyType) {

    filter.propertyType = propertyType;

  }








  /*
  |--------------------------------------------------------------------------
  | Price Filter
  |--------------------------------------------------------------------------
  */

  if (
    minPrice ||
    maxPrice
  ) {


    filter.price = {};



    if (minPrice) {

      filter.price.$gte =
        Number(minPrice);

    }



    if (maxPrice) {

      filter.price.$lte =
        Number(maxPrice);

    }


  }









  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  let sortOption: any = {

    createdAt: -1,

  };




  if (sort === "price_asc") {

    sortOption = {

      price: 1,

    };

  }






  if (sort === "price_desc") {

    sortOption = {

      price: -1,

    };

  }






  if (sort === "newest") {

    sortOption = {

      createdAt: -1,

    };

  }









  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const pageNumber =
    Number(page);



  const limitNumber =
    Number(limit);



  const skip =
    (pageNumber - 1) *
    limitNumber;









  const properties =
    await Property.find(filter)

      .populate(
        "owner",
        "name email"
      )

      .sort(
        sortOption
      )

      .skip(skip)

      .limit(limitNumber);









  const total =
    await Property.countDocuments(
      filter
    );









  return {

    properties,


    pagination: {

      page: pageNumber,

      limit: limitNumber,

      total,

      totalPages:
        Math.ceil(
          total / limitNumber
        ),

    },

  };

};









/*
|--------------------------------------------------------------------------
| Get Single Property
|--------------------------------------------------------------------------
*/

export const getSingleProperty = async (
  id: string
) => {


  const property =
    await Property.findById(id)

      .populate(
        "owner",
        "_id name email phone avatar"
      );


  return property;

};




/*
|--------------------------------------------------------------------------
| Get Owner Properties
|--------------------------------------------------------------------------
*/

export const getMyProperties = async (
  ownerId: string
) => {


  const properties =
    await Property.find({

      owner: ownerId,

    })

      .sort({

        createdAt: -1,

      });



  return properties;

};









/*
|--------------------------------------------------------------------------
| Update Property
|--------------------------------------------------------------------------
*/

export const updateProperty = async (
  id: string,

  ownerId: string,

  payload: UpdatePropertyInput
) => {


  const property =
    await Property.findOneAndUpdate(

      {

        _id: id,

        owner: ownerId,

      },


      payload,


      {

        new: true,

      }

    );


  return property;

};









/*
|--------------------------------------------------------------------------
| Delete Property
|--------------------------------------------------------------------------
*/

export const deleteProperty = async (
  id: string,

  ownerId: string
) => {


  const property =
    await Property.findOneAndDelete({

      _id: id,

      owner: ownerId,

    });



  return property;

};
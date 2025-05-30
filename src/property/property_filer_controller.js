import { propertyModel } from "../model/propertyModel.js";
        // Filtering properties based on data send by user in req.body
    // pass an object with key as filterParams and value as an object of {type,price,state,city,areaSqFt,bedrooms,bathrooms,amenities,furnished,listedBy,tags,rating,isVerified,listingType}
export const propertyFilter=async (req,res)=>{
    try{
        let {type,minPrice,maxPrice,minArea,maxArea,state,city,bedrooms,bathrooms,amenities,furnished,listedBy,tags,rating,isVerified,listingType}={...req.body.filterParams};

        // declaring an filter object for search query
        let filter={}
            // if array type of required property provided
        if(type)
            filter.type={$in:type};

            // if minPrice and maxPrice of required property provided
        if(minPrice)
            filter.price={...filter.price,$gte:minPrice};
        if(maxPrice)
            filter.price={...filter.price,$lte:maxPrice};

            // if minArea and maxArea of required property provided
        if(minArea)
            filter.areaSqFt={...filter.areaSqFt,$gte:minArea};
        if(maxArea)
            filter.areaSqFt={...filter.areaSqFt,$lte:maxArea};
            
            // if minimum number of bedrooms and bathrooms required are provided
        if(bedrooms)
            filter.bedrooms={$gte:bedrooms};
        if(bathrooms)
            filter.bathrooms={$gte:bathrooms};

        // if required amentities are provided 
           // use of $in and $all operators depends how we require data
        if(amenities)
            filter.amenities={$in:amenities}

        // if array of  required furnishing provided
        if(furnished)
            filter.furnished={$in:furnished};

        // if array of listedBy provided
        if(listedBy)
            filter.listedBy={$in:listedBy};

        // if array of state and city provided
        if(state)
            filter.state={$in:state};
        if(city)
            filter.city={$in:city};

        // if minmum rating and listingType and isVerified  of required property provided
        if(rating)
            filter.rating={$gte:rating};
        if(listingType)
            filter.listingType=listingType;
        if(isVerified)
            filter.isVerified=isVerified;

        // if tags of required property provided
        if(tags)
            filter.tags={$in:tags}

        console.log(filter)
        const properties=await propertyModel.find(filter);
        res.status(200).send(properties);
    }catch(err){
        res.status(400).send(`Error->${err}`);
    }
}


        // example of json format passed in post request for above controller
// {
//     "filterParams":{
//         "type": ["Villa","Bungalow","Studio"],
//         "minPrice": 1000000,
//         "maxPrice": 100000000,
//         "minArea": 500,
//         "maxArea": 10000,
//         "state": ["Karnataka","Tamil Nadu","Gujarat"],
//         "city": ["Mysore" ,"Surat"],
//         "bedrooms": 3,
//         "bathrooms": 2,
//         "amenities": ["garden", "parking", "pool"],
//         "furnished": ["Unfurnished","Semi","Furnished"],
//         "listedBy": ["Owner","Agent"],
//         "tags": [ "corner-plot","prime-location"],
//         "rating": 2,
//         "isVerified": "True",
//         "listingType": "sale"
//     }
// }
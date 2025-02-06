import { supabase } from "@/config";
import { TPaginationRequest, TPaginationResponse } from "@/interfaces";
import { NextFunction } from "express";

export const usersFeature = () => {
  return async (req: TPaginationRequest, res: TPaginationResponse, next: NextFunction) => {
    try {
    // Filtering
    const queryObject: { [key: string]: string } = {...req.query};
  
    const excludedFiles = ['sort', 'limit', 'page', 'field', "search"];
    excludedFiles.forEach((ele) => delete queryObject[ele])


    // Advanced filtering (for gte/$lt/)
    let queryString = JSON.stringify(queryObject);
    const reg = /\bgte|gt|lte|lt\b/g;
    queryString = queryString.replace(reg, (matchString) => `.${matchString}`);


    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;


    // Initial Supabase Query
    let query = supabase
    .from("user_municipal_view_enigmatic")
    .select(`
      *`, { count: 'exact' }); // Fetch related `municipal` data based on `municipal_id`

    // Apply Filters
    if(Object.keys(queryObject).length > 0) query = query.match(JSON.parse(queryString));


    // Apply Search
    if (req.query.search) {
      const searchText = req.query.search.toLowerCase();

      // Search in user table fields
      query = query.or(
        `firstName.ilike.%${searchText}%,lastName.ilike.%${searchText}%,middleName.ilike.%${searchText}%,email.ilike.%${searchText}%,municipal.ilike.%${searchText}%`
      );


    }
    
    // Apply Pagination
    query = query.range(offset, offset + limit - 1);

    
    // Apply sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(',');
      query = query.order(sortBy);
    } else {
      query = query.order('created_at', { ascending: false });
    }
    

    // Execute the base query to get data and count
    let { data, count, error} = await query;


    if(error) throw error;

    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(',');

      ({ data, count, error } = await supabase.from('user_municipal_view_enigmatic').select(fields, { count: 'exact' }).range(offset, offset + limit - 1));
      if (error) {
        throw error;
      }    
    }

    const results: any = {
      currentPage: {
        page, limit
      },
      totalDocs: count,
      totalPages: Math.ceil(count! / limit),
      lastPage: Math.ceil(count! / limit),
      results: data
    }

    if (offset + limit < count!) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (offset > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }


    // Add paginated results to the response
    res.paginatedResults = results;
  
    
    next();

    } catch (error) {
      console.log(`[UserErrorFeatures]: ${JSON.stringify(error, null, 4)}`)
      return next(error)
    }
  } 
}

export default usersFeature;

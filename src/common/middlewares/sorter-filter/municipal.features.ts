import { supabase } from "@/config";
import { TPaginationRequest, TPaginationResponse } from "@/interfaces";
import { NextFunction } from "express";

export const municipalFeature = () => {
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

    console.log(page)

    // Initial Supabase Query
    let query = supabase.from("municipal").select("*", { count: 'exact' });

    // Apply Filters
    if(Object.keys(queryObject).length > 0) query = query.match(JSON.parse(queryString));


    // Apply Search
    if (req.query.search) {
      const searchText = req.query.search.toLowerCase();
      query = query.or(
        `municipal.ilike.%${searchText}%`
      )

      console.log(searchText)
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

      ({ data, count, error } = await supabase.from('municipal').select(fields, { count: 'exact' }).range(offset, offset + limit - 1));
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
      console.log(`[MunicipalErrorFeatures]: ${error}`)
      return next(error)
    }
  } 
}

export default municipalFeature;

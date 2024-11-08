import { Request, Response } from "express";

export interface TPaginationRequest extends Request {
  query: {
    limit: string;
    page: string;
    orderBy: string;
    search: string;
    sort: string;
    fields: string;
  }
}

export interface TPaginationResponse extends Response {
  paginatedResults?: {
    results: any;
    next: string;
    previous: string;
    currentPage: string;
    totalDocs: string;
    totalPages: string;
    lastPage:string;
  }
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;

  type?: string;
}


export interface SuccessResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

interface IReturnType<T> {
  error: (statusCode: number, error: Error, message: string, type?: string ) => ErrorResponse;
  success: (statusCode: number, data: T, message?: string) => SuccessResponse<T>
}


/**
 * 
 * Create a response object with error and success methods
 * 
 * @example success reponse
 * const reponse = reponse<{data: string}>().success(200, { data: "data"})
 * 
 * @example error response
 * const reponse = reponse().error(500, new Error("error"), "Internal Server Error")
 * 
 */

export const customResponse = <T>(): IReturnType<T> => {
  return {
    error: (statusCode: number, error: Error,  message: string, type?: string) => ({
      statusCode, error: JSON.stringify(error), message, type
    }),
    

    success: (statusCode: number, data: T, message = "success") => ({
      statusCode, data, message
    })
  }
}

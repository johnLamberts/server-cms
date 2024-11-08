export interface ResponseT<T = null> {
  data: T;
  message: boolean;
  statusCode: number;
  status: string;
}

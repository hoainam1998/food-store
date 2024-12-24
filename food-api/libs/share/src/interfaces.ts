export interface IResponse {
  message: string;
}

export interface IPagination<T> {
  list: T[];
  total: number;
}

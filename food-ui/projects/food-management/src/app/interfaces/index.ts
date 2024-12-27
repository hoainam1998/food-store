export interface IResponseMessage {
  message: string;
}

export interface IPagination<T> {
  list: T[];
  total: number;
}

export interface ICategory {
  categoryId: string;
  avatar: string;
  name: string;
}

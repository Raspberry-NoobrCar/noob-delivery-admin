declare namespace Common {
  export interface Response<TData> {
    code: number;
    msg: string;
    data: TData
  }
}
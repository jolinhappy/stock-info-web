interface IApiResponse<T> {
  data: T;
  msg: string;
  status: any;
}

export default IApiResponse;

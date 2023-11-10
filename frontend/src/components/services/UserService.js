import { postDataPromise } from "./ApiService";

export const loginUser = async (params) => {
  return postDataPromise(`login`, params);
};

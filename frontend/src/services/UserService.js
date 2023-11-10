import { getDataPromise, postDataPromise } from "./ApiService";

export const loginUser = async (params) => {
  return postDataPromise(`login`, params);
};

export const logoutUser = async () => {
  return getDataPromise(`logout`);
};

import { getDataPromise } from "./ApiService";

export const getCategoriesFromDb = async () => {
  return getDataPromise(`categories`);
};

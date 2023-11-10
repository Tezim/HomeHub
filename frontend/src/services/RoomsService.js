import { getDataPromise } from "./ApiService";

export const getRoomsFromDb = async () => {
  return getDataPromise(`rooms`);
};

import { getDataPromise } from "./ApiService";

export const getDevicesFromDb = async () => {
  return getDataPromise(`devices/all`);
};

export const getDevicesForRoom = async (name) => {
  return getDataPromise(`devices/room/${name}`);
};

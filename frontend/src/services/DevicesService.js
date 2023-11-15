import { getDataPromise, postDataPromise } from "./ApiService";

export const getDevicesFromDb = async () => {
  return getDataPromise(`devices/all`);
};

export const getDevicesForRoom = async (name) => {
  return getDataPromise(`devices/room/${name}`);
};

export const getDevicesForRoomId = async (id) => {
  return getDataPromise(`devices/room/${id}`);
};

export const addDeviceToDb = async (device) => {
  return postDataPromise(`devices/add`, device);
};

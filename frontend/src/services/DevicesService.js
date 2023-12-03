import { getDataPromise, postDataPromise, putDataPromise } from "./ApiService";

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

export const updateDeviceInDb = async (name, id, device) => {
  return putDataPromise(`devices/room/${name}/${id}`, device);
};

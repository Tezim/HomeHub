import { getDataPromise, postDataPromise } from "./ApiService";

export const getRoomsFromDb = async () => {
  return getDataPromise(`rooms`);
};

export const addRoomToDb = async (room) => {
  return postDataPromise(`rooms/add`, room);
};

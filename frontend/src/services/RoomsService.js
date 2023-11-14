import {
  deleteDataPromise,
  getDataPromise,
  postDataPromise,
  putDataPromise,
} from "./ApiService";

export const getRoomsFromDb = async () => {
  return getDataPromise(`rooms`);
};

export const addRoomToDb = async (room) => {
  return postDataPromise(`rooms/add`, room);
};

export const updateRoomDb = async (room, id) => {
  return putDataPromise(`rooms/${id}`, room);
};

export const deleteRoomFromDb = async (id) => {
  return deleteDataPromise(`rooms/${id}`);
};

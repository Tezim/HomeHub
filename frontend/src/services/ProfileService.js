import { getDataPromise, postDataPromise, putDataPromise } from "./ApiService";

export const loginUser = async (params) => {
  return postDataPromise(`login`, params);
};

export const registerUser = async (params) => {
  return postDataPromise(`register`, params);
};

export const logoutUser = async () => {
  return getDataPromise(`logout`);
};

export const getProfileFromDb = async () => {
  return getDataPromise(`profile/general`);
};

export const getProfileSecurityFromDb = async () => {
  return getDataPromise(`profile/security`);
};

export const getProfileGroupsFromDb = async () => {
  return getDataPromise(`profile/groups`);
};

export const getProfileRemindersFromDb = async () => {
  return getDataPromise(`profile/reminders`);
};

export const updateProfileInDb = async (profile) => {
  return putDataPromise(`profile/general`, profile);
};

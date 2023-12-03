import { getDataPromise } from "./ApiService";

export const GetStatisticsForDevice = async (id) => {
  return getDataPromise(`stats/${id}`);
};

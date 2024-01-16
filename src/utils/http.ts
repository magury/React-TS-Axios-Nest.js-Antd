import axios from "axios";
export const http = axios.create({
  baseURL: "http://localhost:3011",
  timeout: 5000,
});
export const deleteUser = async (params: any) => {
  const res = await http.request({
    url: "/delete/customer",
    params,
    method: "delete",
  });
  return res.data;
};
export const deleteReport = async (id: any) => {
  const res = await http.request({
    url: "/delete/report",
    params: {
      customerId: id,
    },
    method: "delete",
  });
  return res.data;
};
export const getReport = async (params: any) => {
  const res = await http.request({
    url: "/upload/report",
    method: "get",
    params,
  });
  return res.data;
};

import axios from "axios";

export const http = axios.create({
  baseURL: "http://134.175.81.248:5000",
  timeout: 5000,
});
export const deleteUser = async (params: any) => {
  const res = await http.request({
    url: "/users",
    params,
    method: "delete",
  });
  return res.data;
};
export const deleteReport = async (id: any) => {
  const res = await http.request({
    url: "/upload/report",
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
export const getHospitalList = async (hospital: any) => {
  const res = await http.request({
    url: "/hospitals/list",
    method: "get",
    params: { hospital },
  });
  return res.data;
};
export const getHospitalJson = async (hospitalName: any) => {
  const res = await http.request({
    url: "/hospitals/json",
    method: "get",
    params: {
      hospitalName,
    },
  });
  return res.data;
};
export const getPopularJson = async () => {
  let res = await http.get("/hospitals/popular");
  return res.data;
};

export async function putPublicJson(onlyKey: string, data: any) {
  let res = await http.put("/hospitals/json", {
    onlyKey,
    data,
  });
  return res.data;
}

export const putTopicContent = async (data: any) => {
  const res = await http.put("/hospitals/content", data);
  return res.data;
};
export const putInquireImg = async (param: any) => {
  const data = new FormData();
  data.append("file", param.file);
  const res = await http.request({
    url: "upload/report",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
    onUploadProgress: (progressEvent) => {
      // @ts-ignore
      param.progress((progressEvent.loaded / progressEvent.total) * 100);
    },
  });
  param.success({
    url: res.data.result.url,
    meta: {
      id: res.data.result.url,
      title: "xxx",
      alt: "xxx",
    },
  });
  return res.data;
};
/** fetch请求 */
export const fetchPutInquireImg = async (param: any) => {
  const body = new FormData();
  body.append("file", param.file);
  const res = await fetch("http://localhost:3011/upload/report", {
    body,
    method: "put",
  }).then((res) => res.json());
  param.success({
    url: res.result.url,
    meta: {
      id: res.result.url,
    },
  });
};
export const postTalking = async (data: any) => {
  const res = await http.request({
    method: "post",
    url: "users/experience",
    data,
  });
  return res.data;
};
export const postComment = async (data: any) => {
  const res = await http.request({
    method: "post",
    url: "/users/comment",
    data,
  });
  return res.data;
};
export const getLogin = async (params: {
  username: string | undefined;
  password: string | undefined;
}) => {
  const res = await http.request({
    url: "users/login",
    params,
  });
  return res.data;
};
export const getRegister = async (params: {
  username: string;
  password: string;
}) => {
  const res = await http.request({
    url: "/register",
    params,
  });
  return res.data;
};
export const getAdminLogin = async (params: {
  username: string;
  password: string;
}) => {
  const res = await http.request({
    url: "manager",
    params,
  });
  return res.data;
};

export const postManager = async (data: any) => {
  const res = await http.request({
    url: "manager",
    method: "post",
    data,
  });
  return res.data;
};
export const deleteById = async (data: any) => {
  const res = await http.request({
    url: `/hospitals/${data}`,
    method: "delete",
  });
  return res.data;
};
export const createDoctor = async (data: any) => {
  const res = await http.request({
    url: "users/default",
    method: "post",
    data,
  });
  return res.data;
};
export const deleteDoctor = async (data: any) => {
  const res = await http.request({
    url: "doctors",
    method: "delete",
    data,
  });
  return res.data;
};
export const deleteJson = async (data: any) => {
  const res = await http.request({
    method: "post",
    data,
    url: "hospitals/essays",
  });
  return res.data;
};
export const deleteComments = async (data: any) => {
  const res = await http.request({
    url: "users/comments",
    method: "delete",
    data,
  });
  return res.data;
};
export const postFallback = async (data: any) => {
  const res = await http.request({
    url: "doctors/fallback",
    data,
    method: "post",
  });
  return res.data;
};
export const getFallback = async () => {
  const res = await http.request({
    url: "doctors/fallback",
  });
  return res.data;
};
export const putFallback = async (data: any) => {
  const res = await http.request({
    url: "doctors/fallback",
    method: "put",
    data,
  });
  return res.data;
};
export const postContent = async (data: any) => {
  const res = await http.request({
    url: "hospitals/content",
    data,
    method: "post",
  });
  return res.data;
};
export const getPatients = async (params: any) => {
  const res = await http.request({
    url: "users/patients",
    method: "get",
    params,
  });
  return res.data;
};
export const getBads = async (params: any) => {
  const res = await http.request({
    url: "users/bad",
    params,
  });
  return res.data;
};
export const postAdds = async (data: any) => {
  const res = await http.request({
    url: "users/update",
    method: "post",
    data,
  });
  return res.data;
};

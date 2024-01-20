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
export const getHospitalList = async (hospital: any) => {
    const res = await http.request({
        url: "/hospital/list",
        method: "get",
        params: {hospital},
    });
    return res.data;
};
export const getHospitalJson = async (hospitalName: any) => {
    const res = await http.request({
        url: "/hospital/json",
        method: "get",
        params: {
            hospitalName,
        },
    });
    return res.data;
};
export const getPopularJson = async () => {
    let res = await http.get("/hospital/popular")
    return res.data
}

export async function putPublicJson(onlyKey: string, data: any) {
    let res = await http.put("/hospital/json", {
        onlyKey, data
    })
    return res.data
}

export const putTopicContent = async (data: any) => {
    const res = await http.put('/hospital/topic/content', data)
    return res.data

}

import { axiosJWT } from "./UserServices";
export const createOrder = async (data,access_token) => { 
    const res = await axiosJWT.post(`${import.meta.env.VITE_SERVER_HOST}/order/create`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const getOrderbyUserId = async (id,access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/get-order-details/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const getAllOrder = async (access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/get-all-order`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}


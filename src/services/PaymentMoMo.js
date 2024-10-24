import axios from "axios";


export const getConfig = async () => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/payment/momo`)
    return res.data
}

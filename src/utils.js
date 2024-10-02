import { orderContant } from "./contant";

export const isJsonString = (data) => {
    try{
        JSON.parse(data)
    }catch (error) {
        return false
    }
    return true
}
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

export const renderOption = (arr) => { 
    let results = []
    if(arr){
        results = arr?.map((opt) => {
            return{
                value: opt,
                label: opt,
            }
        })
    }
    results.push({
        label: 'Thêm type',
        value: 'add_type'
    })
    return results
}
export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',','.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}
export const convertPriceDataChart = (price) => {
    try {
        // Kiểm tra nếu giá trị không phải là số, trả về chuỗi rỗng
        if (typeof price !== "number") return ""; 
        // Định dạng số với dấu phẩy
        const result = price.toLocaleString(); 
        return `${result}đ`; // Thêm đơn vị tiền tệ
    } catch (error) {
        return null; // Trả về null nếu có lỗi
    }
};



export const convertStatusOrder = (status) => {
    try {
        switch (status) {
            case 'Shipped':
                return 'Đang giao hàng';
            case 'Delivered':
                return 'Đã giao hàng';
            case 'Cancelled':
                return 'Đã hủy';
            case 'Processing':
                return 'Đang xử lý';
            default:
                return 'Trạng thái không xác định';
        }
    } catch (error) {
        return null;
    }
};


export const convertPaidOrder = (paid) => {
    try {
        switch (paid) {
            case 'true':
                return 'Đã thanh toán';
            case 'false':
                return 'Chưa thanh toán';
            default:
                return 'Chưa thanh toán';
        }
    } catch (error) {
        return null;
    }
};

export const convertDataChart = (data, type) => {
    try{
        const object = {}
        Array.isArray(data) && data.forEach((opt) => {
            if(!object[opt[type]]){
                object[opt[type]] = 1 
            }else{
                object[opt[type]]++
            }

        })
        Object.keys(object)
        const result =  Array.isArray(Object.keys(object)) && Object.keys(object).map((item) => {
            return{
                name: orderContant.payment[item],
                value: object[item]
            }
        })
        return result
    }catch(e) {
        return []
    }
   
}
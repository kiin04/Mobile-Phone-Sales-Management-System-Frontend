import React, { useState } from "react";
import {WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { convertPrice} from "../../utils";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");

  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isPending: isLoadingOrders, data: orders } = queryOrder;


  const headers = [
    { label: "Tên Người dùng", key: "userName" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Địa chỉ", key: "address" },
    { label: "Thành phố", key: "city" },
    { label: "Phí giao hàng", key: "shippingPrice" },
    { label: "Phương thức thanh toán", key: "paymentMethod" },
    { label: "Đơn giá", key: "price" },
    { label: "Tổng tiền", key: "totalPrice" },
    


  ];

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city - b.city,
    },
    {
      title: "Shipping Price",
      dataIndex: "shippingPrice",
      sorter: (a, b) => a.shippingPrice - b.shippingPrice,
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod - b.paymentMethod,
    },
    {
      title: "Tổng tiền đơn hàng ",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    
  ];
  const dataTable = orders?.data.length
    ? orders.data.map((order) => {
        return {
          ...order,
          key: order._id,
          userName: order?.shippingAddress?.fullName,
          phone: order?.shippingAddress?.phone,
          address: order?.shippingAddress?.address,
          city: order?.shippingAddress?.city,
          paymentMethod: orderContant.payment[order?.paymentMethod],
          totalPrice: convertPrice(order?.totalPrice),
          shippingPrice: convertPrice(order?.shippingPrice),
        };
      })
    : [];
  return (
    <div>
      <WrapperHeader> Quản lý đơn hàng </WrapperHeader>
      <div style={{height: 180, width: 200}}>
      <PieChartComponent data={orders?.data}/>
      </div>
      <div style={{ marginTop: "30px" }}>
        <TableComponent
          filename={"Order"}
          headers={headers}
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
        />
      </div>
    </div>
  );
};

export default AdminOrder;

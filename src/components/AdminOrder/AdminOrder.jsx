import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  convertPrice,
  convertStatusOrder,
  convertPaidOrder,
  convertPercent,
  convertDateISO,
} from "../../utils";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Button, Dropdown, Image, Menu, Table } from "antd";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [dataTable, setDataTable] = useState([]);
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
    { label: "Tình trạng", key: "orderStatus" },
    { label: "Thanh toán", key: "isPaid" },
    { label: "Mã giảm giá áp dụng", key: "discountCode" },
    { label: "Phần trăm giảm giá", key: "discountPercentage" },
    { label: "Ngày đặt", key: "createdAt" },
    { label: "Ngày cập nhật", key: "updatedAt" },

  ];

  const columns = [
    {
      title: "Tên người mua",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Tình trạng đơn hàng",
      dataIndex: "orderStatus",
      sorter: (a, b) => a.orderStatus - b.orderStatus,
      render: (text, record) => {
        const menuItems = [
          { label: "Đang giao hàng", key: "Shipped" },
          { label: "Đã giao hàng", key: "Delivered" },
          { label: "Đang xử lý", key: "Processing" },
          { label: "Đã hủy", key: "Cancelled" },
        ];

        const menu = (
          <Menu onClick={(e) => handleStatusChange(record._id, e.key)}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        );

        return (
          <Dropdown onSettled overlay={menu} trigger={["click"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={(e) => e.preventDefault()}>
                {text}
              </Button>
            </div>
          </Dropdown>
        );
      },
    },
    
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid - b.isPaid,
      render: (text, record) => {
        const paidText = record.isPaid ? "Đã thanh toán" : "Chưa thanh toán";

        const menuItems = [
          { label: "Đã thanh toán", key: "true" },
          { label: "Chưa thanh toán", key: "false" },
        ];

        const menu = (
          <Menu onClick={(e) => handlePaidChange(record._id, e.key)}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={(e) => e.preventDefault()}>{paidText}</Button>
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Tổng tiền đơn hàng ",
      dataIndex: "totalPrice",
      color: "red",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Tiền giao hàng",
      dataIndex: "shippingPrice",
      sorter: (a, b) => a.shippingPrice - b.shippingPrice,
    },
    {
      title: "Tỷ lệ giảm giá",
      dataIndex: "discountPercentage",
      width: 10,
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Mã giảm giá",
      dataIndex: "discountCode",
      width: 50,
      sorter: (a, b) => a.discountCode - b.discountCode,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      width: 50,
      sorter: (a, b) => a.paymentMethod - b.paymentMethod,
    },
    

    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      sorter: (a, b) => a.city - b.city,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
    },    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
    },
  ];
  useEffect(() => {
    console.log("Orders data: ", orders);
    if (orders?.data) {
      const updatedDataTable = orders.data.map((order) => ({
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: `0${order?.shippingAddress?.phone}`,
        address: order?.shippingAddress?.address,
        city: order?.shippingAddress?.city,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        totalPrice: convertPrice(order?.totalPrice),
        shippingPrice: convertPrice(order?.shippingPrice),
        orderStatus: convertStatusOrder(order?.orderStatus),
        isPaid: order?.isPaid,
        discountPercentage: convertPercent(order?.discountPercentage),
        createdAt: convertDateISO(order?.createdAt) ,
        updatedAt: convertDateISO(order?.updatedAt) ,
      }));
      setDataTable(updatedDataTable); // Cập nhật trạng thái dataTable
    }
  }, [orders]);

  //updateStatusOrder
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return OrderService.updateOrder(id, token, { ...rests });
  });

  const handleStatusChange = (orderId, status) => {
    mutationUpdate.mutate(
      {
        id: orderId,
        token: user?.access_token,
        orderStatus: status,
      },
      {
        onSuccess: () => {
          // Cập nhật dataTable sau khi thay đổi trạng thái thành công
          setDataTable((prevData) =>
            prevData.map((order) =>
              order.key === orderId
                ? { ...order, orderStatus: convertStatusOrder(status) }
                : order
            )
          );
        },
      }
    );
  };

  const handlePaidChange = (orderId, paid) => {
    const isPaidValue = paid === "true"; // Convert string to boolean
    mutationUpdate.mutate(
      {
        id: orderId,
        token: user?.access_token,
        isPaid: isPaidValue,
      },
      {
        onSuccess: () => {
          setDataTable((prevData) =>
            prevData.map((order) =>
              order.key === orderId
                ? { ...order, isPaid: isPaidValue } // Update isPaid value
                : order
            )
          );
        },
      }
    );
  };
  return (
    <div>
      <WrapperHeader> Quản lý đơn hàng </WrapperHeader>
      <div style={{ height: 180, width: 200 }}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: "30px" }}>
      <TableComponent 
      filename={"Order"}
      headers={headers}
      columns={columns}
      isLoading={isLoadingOrders}
      data={dataTable}
      expandable={{
    expandedRowRender: (record) => (
      <div style={{ margin: 0 }}>
        {record.orderItems.map((item, index) => (
          <div key={index} style={{ marginBottom: '8px', padding: '4px', borderBottom: '1px solid #ddd',display: 'flex', gap: '10px' }}>
            <Image src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginLeft: '8px', borderRadius: '3px' }} />
            <p> {item.name} </p>
            <p><strong>x{item.amount} </strong> </p>
            <p>Giá: {item.price.toLocaleString()} VND</p>
          </div>
        ))}
      </div>
      
    ),
  }}
/>

      </div>
    </div>
  );
};

export default AdminOrder;

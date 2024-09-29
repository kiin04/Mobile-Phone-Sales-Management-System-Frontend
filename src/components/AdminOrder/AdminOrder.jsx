import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { convertPrice, convertStatusOrder, renderOption } from "../../utils";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Dropdown, Menu } from "antd";

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
              <a onClick={(e) => e.preventDefault()}>
                {text} <span>▼</span>
              </a>
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Tình trạng đơn hàng",
      dataIndex: "orderStatus",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
  ];
  useEffect(() => {
    if (orders?.data) {
      const updatedDataTable = orders.data.map((order) => ({
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        city: order?.shippingAddress?.city,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        totalPrice: convertPrice(order?.totalPrice),
        shippingPrice: convertPrice(order?.shippingPrice),
        orderStatus: convertStatusOrder(order?.orderStatus),
      }));
      setDataTable(updatedDataTable); // Cập nhật trạng thái dataTable
    }
  }, [orders]);

  //updateStatusOrder
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return OrderService.updateStatusOrder(id, token, { ...rests });
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
        />
      </div>
    </div>
  );
};

export default AdminOrder;

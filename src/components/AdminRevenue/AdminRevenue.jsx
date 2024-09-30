import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Dropdown, Menu } from "antd";
import BarChartComponent from "./BarChartComponent";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const user = useSelector((state) => state?.user);

  //tong doanh thu
  const totalRevenue = async () => {
    const res = await OrderService.totalRevenue(user?.access_token);
    return res;
  };
  const queryRevenue = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: totalRevenue,
  });
  const { isPending: isLoadingtotal, data: dataTotal } = queryRevenue;

  //doanh thu theo thang
  const monthlyRevenue = async () => {
    const res = await OrderService.monthlyRevenue(user?.access_token, 2024);
    console.log("res", res);
    return res;
  };
  const queryMonthlyRevenue = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: monthlyRevenue,
  });
  const { isPending: isLoadingMonthly, data: dataMonthly } =
    queryMonthlyRevenue;

  const chartData =
    dataMonthly && dataMonthly.length > 0
      ? dataMonthly.map((item) => ({
          name: `Tháng ${item._id.month}`, // Tên tháng
          doanhthu: item.monthlyRevenue, // Doanh thu hàng tháng
          pv: 0, // Giá trị mặc định
          amt: 0, // Giá trị mặc định
        }))
      : [];


  return (
    <div>
      <WrapperHeader> Quản lý doanh thu </WrapperHeader>
      <div style={{ height: 180, width: 200 }}>
        tổng doanh thu: {dataTotal?.totalRevenue}
      </div>
      <div style={{ marginTop: "30px" }}>
        <BarChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default AdminOrder;

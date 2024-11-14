import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Dropdown, Flex, Menu } from "antd";
import BarChartComponent from "./BarChartComponent";
import { convertPrice, convertPriceDataChart } from "../../utils";

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
    return res;
  };
  const queryMonthlyRevenue = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: monthlyRevenue,
  });
  const { isPending: isLoadingMonthly, data: dataMonthly } =
    queryMonthlyRevenue;

    const chartData = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
    
      // Kiểm tra nếu dataMonthly tồn tại và có dữ liệu
      const item = dataMonthly && dataMonthly.length > 0
        ? dataMonthly.find((item) => item._id.month === month)
        : null;
    
      return {
        name: `Tháng ${month}`,                    // Tên tháng
        doanhthu: item ? item.monthlyRevenue : 0,   // Doanh thu hoặc 0 nếu không có
        pv: 0,                                      // Giá trị mặc định
        amt: 0,                                     // Giá trị mặc định
      };
    });
    
    
  return (
    <div>
      <WrapperHeader> Quản lý doanh thu </WrapperHeader>
      <div style={{ height: 100, width: 1000 }}>
        <div style={{ fontSize: "25px", fontWeight: 500 }}>
          TỔNG DOANH THU:
          <span style={{ color: "red" }}>
            {" "}
            {convertPrice(dataTotal?.totalRevenue)}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "10px", display: "flex" }}>
        <span style={{ fontSize: "25px", fontWeight: 500 }}>
          Doanh thu theo tháng: 
        </span>
        <BarChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default AdminOrder;

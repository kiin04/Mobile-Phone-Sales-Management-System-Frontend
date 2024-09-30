import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  console.log("data", data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart barSize={20} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="doanhthu" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

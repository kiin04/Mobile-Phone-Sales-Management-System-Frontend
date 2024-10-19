import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperContainer,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemsOrder,
} from "./style";
import { useSelector } from "react-redux";

import Loading from "../../components/LoadingComponent/Loading";

import { convertPrice } from "../../utils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  console.log("location", location);

  const { state } = location;

  return (
    <Loading isPending={false}>
      <div style={{ background: "#f5f5fa", width: "100%", height: "1000px" }}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            ĐƠN HÀNG CỦA BẠN ĐÃ ĐƯỢC ĐẶT THÀNH CÔNG
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <h3>Phương thức giao hàng</h3>
                  <div>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {orderContant.delivery[state?.delivery]}
                    </span>
                    <span> Giao hàng tiết kiệm</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <h3>Phương thức thanh toán</h3>
                  <div>
                    <span>{orderContant.payment[state?.payment]}</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <h3>Mã giảm giá đã áp dụng: </h3>
                  <div>
                    <span>"{state?.discountCode}"</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ border: "2px solid #4588B5" }}>
                <span
                  style={{
                    color: "red",
                    fontWeight: "700",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    paddingTop: "20px",
                    fontSize: "25px",
                  }}
                >
                  Chi tiết đơn hàng
                </span>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemsOrder>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={order?.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            padding: "10px",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "16px", color: "#242424" }}>
                            Đơn giá: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span>Số lượng:</span>
                          <span> {order?.amount}</span>
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            color: "red",
                            fontWeight: 500,
                          }}
                        >
                          {convertPrice(order?.price * order?.amount)}
                        </span>
                      </div>
                    </WrapperItemsOrder>
                  );
                })}
                
              </WrapperInfo>
          
            </WrapperContainer>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default OrderSuccess;

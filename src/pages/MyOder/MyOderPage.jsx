import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
  Alert,
  Divider,
  Empty,
} from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import { convertDateISO, convertPrice, convertStatusOrder } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import {
  WrappterItemDetail,
  WrappterItemDetailImage,
  WrappterTextWithBoder,
} from "./style";
import { orderContant } from "../../contant";
import { useNavigate } from "react-router-dom";

const OrderCard = styled(Card)`
  margin-bottom: 20px;
  .order-status {
    color: #f5222d;
  }
  .order-total {
    color: #fa541c;
    font-weight: bold;
  }
`;

const MyOrderPage = () => {
  const user = useSelector((state) => state?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  const getOrderOfUser = async () => {
    const res = await OrderService.getOrderOfUser(user?.id, user?.access_token);
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderOfUser,
  });

  const { isPending: isLoadingOrders, data: orders } = queryOrder;

  const mutationCancel = useMutationHooks((data) => {
    const { id, token } = data;
    return OrderService.cancelOrder(id, token);
  });

  const mutationDetails = useMutationHooks((data) => {
    const { id } = data;
    return OrderService.getDetailOrderbyID(id);
  });

  const {
    data: dataCancel,
    isPending: isLoadingCancel,
    isSuccess: isSuccessCancel,
  } = mutationCancel;
  const {
    data: dataDetails,
    isPending: isLoadingDetail,
    isSuccess: isSuccessDetail,
  } = mutationDetails;
  console.log("dataDetails", dataDetails);

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success(dataCancel?.message);
    } else if (dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    }
  }, [isSuccessCancel, dataCancel]);

  const handleCancelOrder = (idOrder) => {
    mutationCancel.mutate(
      { id: idOrder, token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleDetailOrder = (idOrder) => {
    mutationDetails.mutate({ id: idOrder});
  };

  const openCancelModal = (idOrder) => {
    setSelectedOrderId(idOrder);
    setIsModalOpen(true);
  };

  const openDetailModal = (idOrder) => {
    setSelectedOrderId(idOrder);
    handleDetailOrder(idOrder);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleNavigaveProducts = () => {
    navigate("/products");
  };

  return (
    <Loading isPending={isLoadingOrders}>
      <div style={{ padding: "20px" }}>
        <Typography.Title level={2}>Lịch sử mua hàng</Typography.Title>
          {orders ? (
            <>
              {orders?.data.map((order) => (
                <OrderCard hoverable key={order.id} bordered={false}>
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <div>
                        <span>
                          Ngày đặt hàng: {convertDateISO(order?.createdAt)}
                        </span>
                      </div>

                      <div>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ width: "9rem" }}>
                            Tình trạng giao hàng:{" "}
                          </span>
                          {order?.orderStatus === "Delivered" ? (
                            <Alert
                              message="Đã giao hàng thành công"
                              type="success"
                              showIcon
                              style={{ width: "11em" }}
                            />
                          ) : order?.orderStatus === "Cancelled" ? (
                            <Alert
                              message={convertStatusOrder(order?.orderStatus)}
                              type="error"
                              showIcon
                              style={{ width: "11em" }}
                            />
                          ) : (
                            <Alert
                              message={convertStatusOrder(order?.orderStatus)}
                              type="info"
                              showIcon
                              style={{ width: "11em" }}
                            />
                          )}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ width: "9rem" }}>
                            Tình trạng thanh toán:{" "}
                          </span>
                          {order?.isPaid ? (
                            <Alert
                              message="Đã thanh toán"
                              type="success"
                              showIcon
                              style={{ width: "11em" }}
                            />
                          ) : (
                            <Alert
                              message="Chưa thanh toán"
                              type="info"
                              showIcon
                              style={{ width: "11em" }}
                            />
                          )}
                        </p>
                      </div>
                      {order.orderItems.map((item, idx) => (
                        <Row
                          key={idx}
                          gutter={[8, 8]}
                          style={{ marginBottom: "10px" }}
                        >
                          <Col span={4}>
                            <img
                              src={item.image}
                              style={{ width: "100%", borderRadius: "4px" }}
                            />
                          </Col>
                          <Col span={20}>
                            <p>{item.name}</p>
                            <p>{convertPrice(item.price)}</p>
                            <p>x{item.amount}</p>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <Typography.Text className="order-total">
                        Thành tiền: {convertPrice(order.totalPrice)}
                      </Typography.Text>

                      <div style={{ marginTop: "10px" }}>
                        <Button
                          style={{ marginRight: "10px" }}
                          onClick={() => openCancelModal(order._id)}
                        >
                          Hủy đơn hàng
                        </Button>
                        <Button
                          onClick={() => openDetailModal(order._id)}
                          type="primary"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </OrderCard>
              ))}
            </>
          ) : (
            <Empty
              imageStyle={{
                height: 250,
              }}
              description={
                <span style={{ fontSize: "35px" }}>
                  Bạn chưa có đơn hàng nào.{" "}
                  <a onClick={handleNavigaveProducts}> Mua ngay</a>
                </span>
              }
            ></Empty>
          )}
      </div>

      <ModalComponent
        forceRender
        title="Hủy đơn hàng"
        open={isModalOpen && selectedOrderId !== null}
        onCancel={handleCancelModal}
        onOk={() => handleCancelOrder(selectedOrderId)}
      >
        <Loading isPending={isLoadingCancel}>
          <div>Bạn có chắc chắn sẽ hủy đơn hàng này không?</div>
        </Loading>
      </ModalComponent>

      <ModalComponent
        forceRender
        title="Chi tiết đơn hàng"
        open={isModalOpen && selectedOrderId !== null}
        onCancel={handleCancelModal}
        footer={null}
        width={700}
      >
        <Loading isPending={isLoadingDetail}>
          {isSuccessDetail && dataDetails?.data ? (
            <div>
              <div>
                <span>
                  Tên người nhận: {dataDetails?.data?.shippingAddress?.fullName}
                </span>
              </div>
              <div>
                <span>
                  Số điện thoại: 0{dataDetails?.data?.shippingAddress?.phone}
                </span>
              </div>

              <div>
                <span>
                  Địa chỉ giao hàng:{" "}
                  {dataDetails?.data?.shippingAddress?.address},{" "}
                  {dataDetails?.data?.shippingAddress?.city}
                </span>
              </div>

              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              <p>
                Ngày đặt hàng: {convertDateISO(dataDetails?.data?.createdAt)}
              </p>
              <p>
                Trạng thái giao hàng:{" "}
                {convertStatusOrder(dataDetails?.data?.orderStatus)}
              </p>
              <p>
                Trạng thái thanh toán:{" "}
                {dataDetails?.data?.isPaid
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </p>
              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              {/* Hiển thị chi tiết từng sản phẩm */}
              {dataDetails?.data?.orderItems.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <div>
                    <div>
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={item.image}
                      />{" "}
                    </div>

                    <div>{item.name} </div>
                    <div>x{item.amount} </div>
                    <div style={{ justifyContent: "flex-end", width: "120px" }}>
                      {convertPrice(item.price)}
                    </div>
                  </div>
                </div>
              ))}

              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              <div>
                <WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      padding: "10px 13px",
                      borderBottom: "none",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    Tổng tiền hàng:{" "}
                  </WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "120px",
                      padding: "10px 13px",
                      borderBottom: "none",
                    }}
                  >
                    {convertPrice(dataDetails?.data?.itemsPrice)}
                  </WrappterTextWithBoder>
                </WrappterTextWithBoder>
                {dataDetails?.data?.discountPercentage ? (
                  <WrappterTextWithBoder>
                    <WrappterTextWithBoder
                      style={{
                        padding: "10px 13px",
                        borderBottom: "none",
                        color: "rgba(0,0,0,.54)",
                      }}
                    >
                      Giảm giá trên đơn hàng:{" "}
                    </WrappterTextWithBoder>
                    <WrappterTextWithBoder
                      style={{
                        width: "120px",
                        padding: "10px 13px",
                        borderBottom: "none",
                      }}
                    >
                      - {dataDetails?.data?.discountPercentage} %
                    </WrappterTextWithBoder>
                  </WrappterTextWithBoder>
                ) : null}
                <WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      padding: "10px 13px",
                      borderBottom: "none",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    Phí vận chuyển:{" "}
                  </WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "120px",
                      padding: "10px 13px",
                      borderBottom: "none",
                    }}
                  >
                    {convertPrice(dataDetails?.data?.shippingPrice)}
                  </WrappterTextWithBoder>
                </WrappterTextWithBoder>

                <WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "120px",
                      padding: "10px 13px",
                      borderBottom: "none",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    Thành tiền:
                  </WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "120px",
                      padding: "10px 13px",
                      borderBottom: "none",
                      fontWeight: "bold",
                      color: "#5a97b8",
                      fontSize: "1.1em",
                    }}
                  >
                    {convertPrice(dataDetails?.data?.totalPrice)}
                  </WrappterTextWithBoder>
                </WrappterTextWithBoder>
                <WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "160px",
                      padding: "10px 13px",
                      borderBottom: "none",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    Phương thức thanh toán:
                  </WrappterTextWithBoder>
                  <WrappterTextWithBoder
                    style={{
                      width: "120px",
                      padding: "10px 13px",
                      borderBottom: "none",
                    }}
                  >
                    {orderContant.payment[dataDetails?.data?.paymentMethod]}
                  </WrappterTextWithBoder>
                </WrappterTextWithBoder>
              </div>
            </div>
          ) : (
            <div>Đang tải chi tiết đơn hàng...</div>
          )}
        </Loading>
      </ModalComponent>
    </Loading>
  );
};

export default MyOrderPage;

import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, Form, InputNumber, message, Modal, Button } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../components/ButtonComopnent/ButtonComponent";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperInputNumber,
  WrapperItemsOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import * as UserService from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useNavigate } from "react-router-dom";
import { TagOutlined } from "@ant-design/icons";

const OderPage = () => {
  const navigate = useNavigate();
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;

  const [form] = Form.useForm();

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [listChecked, setListChecked] = useState([]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  // const priceDiscountMemo = useMemo(() => {
  //   const result = order?.orderItemSelected?.reduce((total, cur) => {
  //     return  cur.discount
  //   }, 0);
  //   return result || 0; // Đảm bảo trả về 0 nếu không có kết quả
  // }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 10000000) {
      return 30000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 10000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    const result =
      order?.orderItemSelected?.reduce((total, cur) => {
        const price = cur.price || 0; // Đảm bảo giá là số
        const amount = cur.amount || 0; // Đảm bảo số lượng là số
        return total + price * amount;
      }, 0) || 0; // Đảm bảo không bị NaN

    return result + diliveryPriceMemo || 0; // Tính tổng giá thành
  }, [order?.orderItemSelected, diliveryPriceMemo]); // Thêm order vào mảng phụ thuộc

  // const priceDiscountBeforeMemo = useMemo(() => {
  //   const result = order?.orderItemSelected?.reduce((total, cur) => {
  //     return (priceMemo + diliveryPriceMemo) / cur.discount;
  //   }, 0);
  //   return result || 0; // Đảm bảo trả về 0 nếu không có kết quả
  // }, [priceMemo, diliveryPriceMemo]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const dispatch = useDispatch();

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const handleStep = (value, info, idProduct) => {
    if (info.type === "up") {
      dispatch(increaseAmount({ idProduct }));
    } else if (info.type === "down") {
      dispatch(decreaseAmount({ idProduct }));
    }
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    console.log("user", user);
    if (!order?.orderItemSelected?.length) {
      message.warning("Bạn chưa chọn sản phẩm");
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true);
      message.warning("Vui lòng cập nhật thông tin giao hàng");
    } else {
      navigate("/payment");
    }
  };
  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    });
  };

  // const handleUpdateInfoUser = () => {
  //   const { name, address, city, phone } = stateUserDetails;
  //   if (name && address && city && phone) {
  //     mutationUpdate.mutate(
  //       { id: user?.id, token: user?.access_token, ...stateUserDetails },
  //       {
  //         onSuccess: () => {
  //           // Refresh user details from Redux store
  //           setStateUserDetails({
  //             city: user?.city,
  //             name: user?.name,
  //             address: user?.address,
  //             phone: user?.phone,
  //           });
  //           setIsOpenModalUpdateInfo(false);
  //         },
  //       }
  //     );
  //   }
  // };
  const handleUpdateInfoUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            // Cập nhật lại thông tin người dùng từ Redux hoặc thông tin phản hồi
            setStateUserDetails((prevState) => ({
              ...prevState,
              city: user?.city,  // Hoặc từ response của API nếu có
              name: user?.name,
              address: user?.address,
              phone: user?.phone,
            }));
            setIsOpenModalUpdateInfo(false); // Đóng modal
            message.success("Cập nhật thông tin thành công!"); // Thông báo thành công
          },
          onError: (error) => {
            message.error("Cập nhật thất bại. Vui lòng thử lại!"); // Thông báo lỗi
          }
        }
      );
    } else {
      message.warning("Vui lòng điền đầy đủ thông tin!"); // Cảnh báo nếu thiếu thông tin
    }
  };
  

  useEffect(() => {
    setAddress(user?.address);
    setCity(user?.city);
  }, [user?.address, user?.city]);

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span style={{ padding: "10px" }}>
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemsOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></Checkbox>
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
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        {/* <WrapperPriceDiscount>
                              {order?.amount}
                            </WrapperPriceDiscount> */}
                        <InputNumber
                          defaultValue={1}
                          min={1}
                          max={100}
                          size="small"
                          value={order?.amount}
                          onStep={(value, info) =>
                            handleStep(value, info, order?.product)
                          }
                        />
                      </WrapperCountOrder>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "red",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemsOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {address}, {city}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{
                      color: "#4588B5",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ justifyContent: "start" }}>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      justifyContent: "space-between",
                      fontWeight: "600",
                    }}
                  >
                    {/* {`${priceDiscountMemo} %`} */}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Đã giảm được
                  </span>
                  <span
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {/* {convertPrice(priceDiscountBeforeMemo)} */}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              type="primary"
              style={{
                margin: "10px",
              }}
              styleButton={{
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Mua Hàng"}
              styleTextButton={{
                fontSize: "15px",
                fontWeight: "200",
              }}
            ></ButtonComponent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <TagOutlined style={{ marginRight: "5px" }} />
                <span>Mã ưu đãi</span>
              </div>
              <a href="#" onClick={showModal}>
                Nhập mã giảm giá
              </a>
            </div>
            <Modal
              title="Chọn Mã ưu đãi"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                  OK
                </Button>,
              ]}
            >
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    placeholder="Mã giảm giá"
                    style={{
                      width: "95.5%",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: "10px", width: "100%" }}
                  >
                    ÁP DỤNG
                  </Button>
                </div>

                <div>
                  <h3>Mã ưu đãi khi mua sản phẩm</h3>

                  {/* Container có thanh cuộn dọc */}
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {/* Example vouchers */}
                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALEVNPAY
                        </span>{" "}
                        để giảm ₫5tr khi thanh toán qua VNPAY.
                      </p>
                      <div>Điều kiện: Khi Mua Sản Phẩm Iphone 16 Series</div>
                      <div>HSD: 30.12.2024</div>
                    </div>

                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALEMOMO
                        </span>{" "}
                        để giảm ₫2tr khi thanh toán qua MOMO.
                      </p>
                      <div>Điều kiện: Khi Mua Sản Phẩm Trên ₫10tr</div>
                      <div>HSD: 30.12.2024</div>
                    </div>

                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALE500
                        </span>{" "}
                        để giảm ₫500k khi thanh toán.
                      </p>
                      <div>Điều kiện: Khi Mua Sản Phẩm Trên ₫5tr</div>
                      <div>HSD: 31.12.2024</div>
                    </div>

                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALE100
                        </span>{" "}
                        để giảm ₫100k cho đơn hàng.
                      </p>
                      <div>Điều kiện: Không áp dụng cho sản phẩm giảm giá</div>
                      <div>HSD: 01.01.2025</div>
                    </div>

                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALESPECIAL
                        </span>{" "}
                        để giảm ₫300k khi mua sắm trên ứng dụng.
                      </p>
                      <div>Điều kiện: Khi Mua Sản Phẩm Trên ₫3tr</div>
                      <div>HSD: 15.11.2024</div>
                    </div>

                    <div
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>
                        Nhập mã{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "18px",
                          }}
                        >
                          SALEBIG
                        </span>{" "}
                        để giảm ₫8tr cho đơn hàng lớn.
                      </p>
                      <div>Điều kiện: Khi Mua Sản Phẩm Trên ₫10tr</div>
                      <div>HSD: 30.12.2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        forceRender
        title="Cập nhật thông tin giao hàng "
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
        width={600}
      >
        <Loading isPending={false}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            // onFinish={onUpdateUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name user!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Thành Phố"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input name city!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default OderPage;

import { Col, Image, InputNumber, Rate, Row } from "antd";
import React, { useState } from "react";
import imageProduct from "../../image/iphone-15-pro-max_3.png";
import imageProductSmall from "../../image/iphone-15-pro-max_3.png";
import * as ProductService from "../../services/ProductServices";
import {
  WapperButtonMore,
  WapperPriceBlock,
  WapperQualityCountProduct,
  WapperQualityProduct,
  WapperStyleAssess,
  WapperStyleImage,
  WapperStyleImageSmall,
  WapperStyleNameProduct,
  WapperTextPrice,
} from "./style";
import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/slices/orderSlide";
import { convertPrice } from "../../utils";

const ProductDetailsComponent = ({ idProduct }) => {
  const onChange = () => {};

  const navigate = useNavigate();

  const [NumProduct, setNumProduct] = useState(1);

  const location = useLocation();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const handleChange = (NumProduct) => {
    setNumProduct(NumProduct);
  };

  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
        />
      );
    }
    return stars;
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      //   {
      //     name: {type: String, required: true},
      //     amount: { type: Number, required: true},
      //     image: {type: String, required: true},
      //     price: {type: Number, required: true},
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: NumProduct,
            discount: productDetails?.discount,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: "25px" }}>
        <Col span={10}>
          <WapperStyleImage
            src={productDetails?.image}
            alt="image product"
            preview="true"
          />
          <Row style={{ paddingTop: "10px", marginRight: "20px" }}>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
            <Col span={4}>
              <WapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview="true"
              />
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <WapperStyleNameProduct>
            {productDetails?.name}
          </WapperStyleNameProduct>

          <div>
            {renderStars(productDetails?.rating)}
            {/* <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/> */}

            <WapperStyleAssess style={{ marginLeft: "2px" }}>
              {" "}
              (10 đánh giá)
            </WapperStyleAssess>
          </div>
          <WapperPriceBlock>
            <WapperTextPrice>
              {convertPrice(productDetails?.price)}
            </WapperTextPrice>
          </WapperPriceBlock>
          <div>
            <WapperQualityProduct>
              <WapperQualityCountProduct htmlFor="">
                {" "}
                Số Lượng:{" "}
              </WapperQualityCountProduct>
              <div>
                <InputNumber
                  defaultValue={1}
                  min={1}
                  max={100}
                  size="large"
                  value={NumProduct}
                  onChange={handleChange}
                  // onChange={onChange}
                />
              </div>
            </WapperQualityProduct>
          </div>
          <div
            style={{ marginTop: "50px", display: "flex", alignItems: "center" }}
          >
            <WapperButtonMore
              textButton="Mua Ngay"
              type="primary"
              style={{
                width: "150px",
                height: "34px",
                marginTop: "20px",
                background: "rgb(69, 136, 181)",
              }}
              onClick={handleAddOrderProduct}
            />
            {/* <WapperButtonMore
              icon={
                <ShoppingCartOutlined
                  style={{
                    fontSize: "30px",
                    color: "rgb(69, 136, 181)",
                    marginRight: "5px",
                  }}
                />
              }
              textButton="Thêm vào giỏ hàng"
              type="dashed"
              style={{
                width: "200px",
                height: "34px",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            ></WapperButtonMore> */}
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;

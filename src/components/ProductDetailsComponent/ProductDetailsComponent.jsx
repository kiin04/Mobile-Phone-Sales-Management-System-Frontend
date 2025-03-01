import { Radio, Col, Row, Image, InputNumber, Rate, message } from "antd";
import React, { useState } from "react";
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
  WrapperOutStanding,
  WrapperInfoProduct,
  StyledRadioButton,
  StyledColorButton,
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
  const onValueChange = (e) => {
    setValue(e.target.value);
  };
  const onColorChange = (e) => {
    setColor(e.target.value);
  };

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
          style={{ fontSize: "15px", marginLeft: "3px", color: "#ffc107" }}
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
  console.log("productDetails",productDetails?.image[0])

  const handleAddOrderProduct = () => {
    try{
      if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    }
    else {
      const image = productDetails?.image && productDetails?.image.length > 0 ? productDetails?.image[0] : null;
  
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: NumProduct,
            image: image,  // Lưu ảnh đầu tiên hoặc null nếu không có ảnh
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
      message.success('Thêm sản phẩm vào giỏ hàng thành công!')
    }
  }catch(e){
    message.success('Không thể thêm sản phẩm!')
  }
  };

  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: "25px" }}>
        <Col span={10}>
          <WapperStyleImage
            src={productDetails?.image[0]} // Main image
            alt="image product"
            preview="true"
          />
          <Row style={{ paddingTop: "10px", marginRight: "20px" }}>
            {/* Dynamically render small images */}
            {productDetails?.image?.slice(1).map((image, index) => (
              <Col span={4} key={index}>
                <WapperStyleImageSmall
                  src={image}
                  alt={`image small ${index + 1}`}
                  preview="true"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={14}>
          <WapperStyleNameProduct>
            {productDetails?.name}
          </WapperStyleNameProduct>
          <div>{renderStars(productDetails?.rating)}</div>
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
                />
              </div>
            </WapperQualityProduct>
            <div style={{ marginTop: '20px' }}>
              Tồn kho: {productDetails?.countInStock}
            </div>
          </div>

          <div
            style={{ marginTop: "50px", display: "flex", alignItems: "center" }}
          >
            {NumProduct <= productDetails?.countInStock ? (
        <WapperButtonMore
          icon={
            <ShoppingCartOutlined
              style={{
                fontSize: "30px",
                color: "#ffff",
                marginRight: "5px",
              }}
            />
          }
          textButton="Thêm vào giỏ hàng"
          type="primary"
          style={{
            width: "250px",
            height: "60px",
            marginTop: "20px",
            background: "#0066CC",
          }}
          onClick={handleAddOrderProduct}
        />
      ) : (
        <WapperButtonMore
        textButton="Không đủ sản phẩm"
          type="primary"
          icon={
            <ShoppingCartOutlined
              style={{
                fontSize: "30px",
                color: "#ffff",
                marginRight: "5px",
              }}
            />
          }
          style={{
            width: "250px",
            height: "60px",
            marginTop: "20px",
            background: "#ccc", // Màu sắc khác khi nút bị tắt
          }}
          disabled
        >
        </WapperButtonMore>
      )}
          </div>
        </Col>
        <div>
          <Col
            style={{
              width: "500px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginTop: "50px",
               paddingRight:"5px", paddingLeft:"5px", 
               paddingBottom:"10px"
            }}
          >
            <WrapperInfoProduct>Đặc Điểm Nổi Bật</WrapperInfoProduct>
            <span >{productDetails?.description}</span>
          </Col>
        </div>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;

import { Radio,Col, Flex, Image, InputNumber, Rate, Row } from "antd";
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
  const [color, setColor] = useState("pink");
  const [value, setValue] = useState("128GB");
  const onValueChange = (e) => {
    setValue(e.target.value);
    
  };
  const onColorChange = (e) => {
    setColor(e.target.value);
  }
  
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




          <Radio.Group onChange={onValueChange} value={value}>
      <Row>
        <Col>
          <StyledRadioButton value="128GB">
            <div>128GB</div>
         
          </StyledRadioButton>
        </Col>
        <Col>
          <StyledRadioButton value="256GB">
            <div>256GB</div>
          
          </StyledRadioButton>
        </Col>
        <Col>
          <StyledRadioButton value="512GB">
            <div>512GB</div>
          
          </StyledRadioButton>
        </Col>
      </Row>
    </Radio.Group>



    <h3>Chọn màu cho sản phẩm</h3>
    <Radio.Group onChange={onColorChange} value={color}>
      <Row gutter={[16, 16]}>
        <Col>
          <StyledColorButton value="black">
          <div
                style={{
                  backgroundColor: "black",
                  width: "20px",
                  height: "20px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  position:'absolute',
                }}
              />
            <div>Đen  </div>
            <div>22.790.000 đ</div>
          </StyledColorButton>
        </Col>
        <Col>
          <StyledColorButton value="pink">
          <div
                style={{
                  backgroundColor: "pink",
                  width: "20px",
                  height: "20px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  position:'absolute',
                }}
              />
            <div>Hồng</div>
            <div>25.690.000 đ</div>
          </StyledColorButton>
        </Col>
        <Col>
          <StyledColorButton value="blue">
          <div
      style={{
        backgroundColor: "lightblue",
        width: "20px",
        height: "20px",
        borderRadius: "5px",
        marginBottom: "5px",
        position:'absolute',
      }}
    />
            <div>Xanh</div>
            <div>22.790.000 đ</div>
          </StyledColorButton>
        </Col>
      </Row>
    </Radio.Group>
      
      
    

          



          


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
                width: "250px",
                height: "60px",
                marginTop: "20px",
                background: "#d70018",
              }}
              onClick={handleAddOrderProduct}
            />
            {<WapperButtonMore
              icon={
                <ShoppingCartOutlined
                  style={{
                    fontSize: "30px",
                    color: "#d70018",
                    marginRight: "5px",
                  }}
                />
              }
              textButton="Thêm vào giỏ"
              type="dashed"
              style={{
                width: "200px",
                height: "60px",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            ></WapperButtonMore> }
          </div>
         
        </Col>
        <div  >
         
         <Col  style={{width:'510px',border:'1px solid #e0e0e0',borderRadius:'8px',marginTop:'50px'}}>
         <WrapperInfoProduct>Thông số kĩ thuật</WrapperInfoProduct>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Kích thước màn hình: 6.7 inchs</li>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Công nghệ màn hình: Super Retina XDR OLED</li>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Hiệu năng cân mọi tác vụ - A16 Bionic mạnh mẽ cho mọi thao tác mượt mà và nhanh chóng</li>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Chipset: Apple A16 Bionic</li>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Pin: 4383 mAh</li>
         <li style={{fontSize:'16px',padding:'5px',listStyleType:'none'}}>Thẻ sim: 2 SIM (nano-SIM và eSim)</li>
         </Col>

         
      
         </div>
         <Col  style={{backgroundColor:'#f2f2f2',  width:'510px',borderRadius:'8px',marginLeft:'20px',marginTop:'50px', border:'1px solid #444'}}>
         <WrapperOutStanding>Đặc điểm nổi bật</WrapperOutStanding>
        
        <li style={{fontSize:'16px',padding:'5px'}}>Thiết kế dẫn đầu xu hướng - Nhiều màu sắc trendy cùng chất liệu kính pha màu và khung nhôm vô cùng bền bỉ</li>
         <li style={{fontSize:'16px',padding:'5px'}}>Nắm bắt và tương tác mọi thông tin dễ dàng hơn với Dynamic Island mở rộng</li>
         <li style={{fontSize:'16px',padding:'5px'}}>Chụp ảnh chân dung xuất sắc mọi khoảnh khắc - Camera chính 48MP với tele 2X và chế độ chỉnh sửa đa dạng</li>
         <li style={{fontSize:'16px',padding:'5px'}}>Hiệu năng cân mọi tác vụ - A16 Bionic mạnh mẽ cho mọi thao tác mượt mà và nhanh chóng</li>

        
         </Col>
         
      </Row>
    </Loading>
    
  );
 
};

export default ProductDetailsComponent;

import { Col } from "antd";
import React from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperShoppingHeader,
  WrapperAccountHeader,
  WrapperShipperHeader,
} from "./style";
import Search from "antd/es/transfer/search";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/sign-in");
  };
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={goToHome}>DIENTHOAIHU</WrapperTextHeader>
        </Col>

        <Col span={8}>
          <Search
            placeholder="Bạn cần tìm gì?"
            allowClear
            enterButton="Search"
            size="large"

            //onSearch={onSearch}
          />
        </Col>
        <Col span={4}>
          <WrapperShoppingHeader>
            <div>
              {" "}
              <ShoppingCartOutlined style={{ fontSize: "23px" }} />
            </div>
            <div>
              <span> Giỏ hàng</span>
            </div>
          </WrapperShoppingHeader>
        </Col>
        <Col span={3}>
          <WrapperAccountHeader>
            <div>
              <UserOutlined style={{ fontSize: "23px" }} />
            </div>
            <div>
              <span onClick={goToLogin}>Đăng nhập</span>
            </div>
          </WrapperAccountHeader>
        </Col>

        <Col span={4}>
          <WrapperShipperHeader>
            <div>
              <CarOutlined style={{ fontSize: "23px" }} />
            </div>
            <div>
              <span>Tra cứu đơn hàng </span>
            </div>
          </WrapperShipperHeader>
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;

/*Danh mục
/*<Col span={4}>
        <WrapperTextListHeader>
       <div><UnorderedListOutlined style={{fontSize:'23px'}} /></div>
       <div>   
       <span>Danh mục</span>
       </div>
            
        </WrapperTextListHeader>
        
      </Col>*/

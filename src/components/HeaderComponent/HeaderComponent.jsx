import { Badge, Col, Flex, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperShoppingHeader,
  WrapperAccountHeader,
  WrapperShipperHeader,
  WrapperContentPopup,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingComponent/Loading";
import * as UserService from "../../services/UserServices";
import { searchProduct } from "../../redux/slices/productSlide";
import { resetUser } from "../../redux/slices/userSlide";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const order = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setloading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setloading(false);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateLogo = () => {
    navigate("/");
  };
  const goToProduct = () => {
    navigate("/products");
  };

  const handleNavigateAdmin = () => {
    navigate("/system/admin");
  };
  const handleNavigateProfile = () => {
    navigate("/profile-user");
  };

  const content = (
    <div>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleNavigateAdmin}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}

      <WrapperContentPopup onClick={handleNavigateProfile}>
        Thông tin người dùng
      </WrapperContentPopup>
      {/* <WrapperContentPopup onClick={() => navigate('/my-order')}>
        Đơn hàng của tôi
      </WrapperContentPopup> */}
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={handleNavigateLogo}>
            DIENTHOAIHU
          </WrapperTextHeader>
        </Col>

        <Col span={8}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            size="large"
            onChange={onSearch}
          />
        </Col>
        <Col span={4}>
          <WrapperShoppingHeader
            onClick={() => navigate("/order")}
            style={{ cursor: "pointer" }}
          >
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined
                style={{
                  fontSize: "25px",
                  color: "#fff",
                  marginRight: "5px",
                }}
              />
            </Badge>
            Giỏ Hàng
          </WrapperShoppingHeader>
        </Col>
        <Col span={3}>
          <Popover
            placement="bottom"
            content={user?.access_token ? content : null}
          >
            <WrapperAccountHeader onClick={handleNavigateLogin}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "20px" }} />
              )}

              {user?.access_token ? (
                <div style={{ cursor: "pointer", padding: "5px" }}>
                  {userName?.length ? userName : user?.email}
                  <CaretDownOutlined style={{ marginLeft: "10px" }} />
                </div>
              ) : (
                "Đăng Nhập"
              )}
            </WrapperAccountHeader>
          </Popover>
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

import { Card } from "antd";
import React from "react";
import {
  StyleNameProduct,
  WapperDiscountText,
  WapperPriceText,
  WapperReportText,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    selled,
    id,
  } = props;
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    //chua lam an san pham khi khong con san pham trong ton kho
    <Card
      hoverable
      style={{ width: 240, padding: 10,height:350}}
      bodyStyle={{ padding: 10 }}
      cover={<img alt="example" src={image} />}
      onClick={() =>  handleDetailsProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <div style={{ display: "flex", alignItems: "center" }}>
        <WapperPriceText>
          <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
          <WapperDiscountText> - { 5}%</WapperDiscountText>
        </WapperPriceText>
      </div>
      <WapperReportText>
        <span>
          {rating}{" "}
          <StarFilled
            style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
          />
        </span>
        <span>
          <span style={{ marginLeft: "2px" }}> | Đã bán {selled || 0}+</span>
        </span>
      </WapperReportText>
    </Card>
  );
};

export default CardComponent;

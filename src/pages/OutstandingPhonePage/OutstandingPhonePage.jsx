import React, { useState } from "react";
import { Row, Col, Tag, Button, Card } from "antd";
import {
  OutstandingTitle,
  WapperProduct,
} from "./style"; 
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductServices";

const OutstandingPhonePage = () => {
  const [sortOrder] = useState("none");

  const fetchProducts = async () => {
    return await ProductService.getAllProduct("", 20, null);
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["outstanding-products", sortOrder],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  return (
    <div>
      {/* Tiêu đề cho điện thoại nổi bật */}
      <OutstandingTitle>Điện thoại nổi bật</OutstandingTitle>

      {/* Danh sách sản phẩm */}
      <WapperProduct>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <Row gutter={[16, 16]}>
            {products?.data?.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image} 
                      style={{ height: "20px", objectFit: "cover" }}
                    />
                  }
                >
                  <h3>{product.name}</h3>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {product.price}đ
                  </p>
                  {product.discount > 0 && (
                    <Tag color="red">Giảm {product.discount}%</Tag>
                  )}
                  <Button type="primary">Mua ngay</Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </WapperProduct>
    </div>
  );
};

export default OutstandingPhonePage;

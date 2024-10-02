import React, { useState } from "react";
import { Row, Col, Tag, Button, Card } from "antd";
import { MainContainer, OutstandingTitle, WapperProduct } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductServices";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../../components/LoadingComponent/Loading";
import CardComponent from "../../components/CardComponent/CardComponent";

const OutstandingPhonePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);

  const searchDebounce = useDebounce(searchProduct, 1000);
  const [sortOrder, setSortOrder] = useState("none"); // State cho sắp xếp

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(20);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const sort = sortOrder === "none" ? null : sortOrder; // Chuyển đổi giá trị sắp xếp

    const res = await ProductService.getAllProduct(search, limit, sort);
    return res;
  };
  const {
    isLoading,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce, sortOrder],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  return (
    <div>
      <OutstandingTitle>Điện thoại nổi bật</OutstandingTitle>
      <MainContainer>
        <WapperProduct>
          <Loading isPending={isLoading || loading}>
            <WapperProduct>
              {products?.data?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    id={product._id}
                  />
                );
              })}
            </WapperProduct>
          </Loading>
        </WapperProduct>
      </MainContainer>
    </div>
  );
};

export default OutstandingPhonePage;

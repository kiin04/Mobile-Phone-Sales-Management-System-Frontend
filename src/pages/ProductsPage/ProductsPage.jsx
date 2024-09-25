import React, { useEffect, useState } from "react";
import { Row, Col } from "antd"; // Import Ant Design components
import {
  Header,
  MainContainer,
  WrapperCardStyle,
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  BrandMenuStyle,
  FilterByNeedStyle,
  FilterByCriteriaStyle,
  BannerStyle,
  WapperProduct,
} from "./style"; // Import styled components
import { StarFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductServices";
import CardComponent from "../../components/CardComponent/CardComponent";
import Loading from "../../components/LoadingComponent/Loading";

// Banner Component
// const Banner = () => (
//   <BannerStyle>
//     <img src="https://baotinmobile.vn/uploads/2023/03/sl-iphone-14-promax.jpg.webp" alt="Banner 1" />
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIErKJ76yov-NL8oVsWe6aw85BsxUHbfZFYQ&s" alt="Banner 2" />
//   </BannerStyle>
// );

// Brand Menu Component
// const BrandMenu = () => (
//   <BrandMenuStyle>
//     {[
//       { name: 'Apple', image: 'https://24hstore.vn/images/products/2024/09/12/large/iphone-16-pro-max-512gb-nb_1726109688.jpg' },
//       { name: 'Samsung', image: 'https://bachlongstore.vn/vnt_upload/product/01_2024/436.png' },
//       { name: 'Xiaomi', image: 'https://viostore.vn/wp-content/uploads/2024/02/3-2.png' },
//       { name: 'Oppo', image: 'https://viostore.vn/wp-content/uploads/2023/08/37.png' },
//       { name: 'Realme', image: 'https://viostore.vn/wp-content/uploads/2024/04/1-15.png' },
//       { name: 'Nokia', image: 'https://product.hstatic.net/1000338578/product/thay-man-hinh-nokia-6-1-plus-1_b26ab86c3a204ba0a5a79f7716f6b927_grande.png' },
//       { name: 'Sony', image: 'https://s.alicdn.com/@sc04/kf/Hba0c87e67dd54a1a9c8fef6d90cb69a2u.jpg_720x720q50.jpg' },
//     ].map((brand, index) => (
//       <div key={index}>
//         <img src={brand.image} alt={brand.name} />
//         <p>{brand.name}</p>
//       </div>
//     ))}
//   </BrandMenuStyle>
// );

// Filter by Need Component
// const FilterByNeed = () => (
//   <FilterByNeedStyle>
//     {[
//       { name: 'Chơi game', image: 'https://cdn.tgdd.vn/Files/2021/07/04/1365524/thumb_800x450.jpg' },
//       { name: 'Chụp ảnh đẹp', image: 'https://cdn.tgdd.vn/Files/2021/12/11/1403822/dien-thoai-chup-anh-dep-duoi-10trieu_1280x720-800-resize.jpg' },
//       { name: 'Dung lượng lớn', image: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/184655/Originals/dien-thoai-dung-luong-lon-1.jpg' },
//     ].map((item, index) => (
//       <div key={index}>
//         <img src={`https://example.com/${item.image}`} alt={item.name} />
//         <p>{item.name}</p>
//       </div>
//     ))}
//   </FilterByNeedStyle>
// );

// Filter by Criteria Component
const FilterByCriteria = () => (
  <FilterByCriteriaStyle>
    <select>
      <option>Giá Cao - Thấp</option>
      <option>Giá Thấp - Cao</option>
    </select>
    <select>
      <option>RAM</option>
      <option>4GB</option>
      <option>8GB</option>
    </select>
    <select>
      <option>Bộ nhớ trong</option>
      <option>64GB</option>
      <option>128GB</option>
    </select>
  </FilterByCriteriaStyle>
);

// Main ProductsPage Component
const ProductsPage = () => {
  // Danh sách sản phẩm
  // const products = [
  //   {
  //     name: 'Iphone',
  //     image: 'https://minhtuanmobile.com/uploads/products/230623024256-iphone-14-promax-256g-purple-minh-tuan-mobile.png',
  //     rating: 4.96,
  //     sold: 1000,
  //     price: '1.000.000',
  //     discount: 5,
  //   },
  //   {
  //     name: 'Samsung Galaxy',
  //     image: 'https://didongmoi.com.vn/upload/images/product/samsung-galaxy-s24-ultra-cu-4.jpg',
  //     rating: 4.8,
  //     sold: 500,
  //     price: '900.000',
  //     discount: 10,
  //   },
  // ];
  const searchProduct = useSelector((state) => state?.product?.search);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(20);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  const {
    isLoading,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  return (
    <MainContainer>
      {/* Header */}
      {/* <Header>
        <h1>Danh Sách Điện Thoại</h1>
      </Header> */}

      {/* Banner quảng cáo */}
      {/* <Banner /> */}

      {/* Menu các thương hiệu */}
      {/* <BrandMenu /> */}

      {/* Chọn theo nhu cầu */}
      {/* <FilterByNeed /> */}

      {/* Chọn theo tiêu chí */}
      <FilterByCriteria />

      {/* Danh sách sản phẩm */}
      {/* <Row gutter={16} justify="center">
        {products.map((product, index) => (
          <Col key={index}>
            <WrapperCardStyle
              hoverable
              cover={<img alt={product.name} src={product.image} />}
            >
              <StyleNameProduct>{product.name}</StyleNameProduct>
              <WrapperReportText>
                <span>
                  <span>{product.rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span> | Đã bán {product.sold}+</span>
              </WrapperReportText>
              <WrapperPriceText>
                {product.price}đ
                <WrapperDiscountText>-{product.discount}%</WrapperDiscountText>
              </WrapperPriceText>
            </WrapperCardStyle>
          </Col>
        ))}
      </Row> */}
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
                discount={product.discount}
                id={product._id}
              />
            );
          })}
        </WapperProduct>
      </Loading>
    </MainContainer>
  );
};

export default ProductsPage;

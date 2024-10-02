import React, { } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider3 from "../../assets/images/slider3.webp";
import styled from "styled-components";

//import CardComponent from "../../components/";

const HomePage = () => {


  // const arr = [
  //   "Điện thoại",
  //   "Laptop",
  //   "Phụ kiện",
  //   "Âm thanh",
  //   "Smartwatch",
  //   "Đồng hồ",
  //   "Tablet",
  //   "PC, Máy in",
  //   "Sim, Thẻ cào",
  //   " Tiện ích",
  //   "Khuyến mãi",
  // ];

  return (
    <>
      <div
        style={{
          padding: " 0 120px",
          backgroundColor: "#f2f4f7",
          height: "2000px",
        }}
      >
        {/* <WrapperTypeProduct>
          {arr.map((item, index) => (
            <ProductTypeItem key={index}>{item}</ProductTypeItem>
          ))}
        </WrapperTypeProduct> */}



        <div
          id="container"
          style={{ backgroundColor: "#efefef", padding: "0 120px" }}
        ></div>
        <SliderComponent arrImages={[slider1, slider3]} />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            
          }}
        ></div>
      </div>
    </>
  );
};
export default HomePage;

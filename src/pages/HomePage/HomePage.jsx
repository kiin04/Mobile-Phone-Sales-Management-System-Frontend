import React, { useEffect, useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider3 from "../../assets/images/slider3.webp";
import * as ProductService from "../../services/ProductServices";
import OutstandingPhonePage from "../OutstandingPhonePage/OutstandingPhonePage";
import InfoSection from "../../components/BannerIconInfo/InfoSection";
import Footer from "../../components/Footer/Footer";

//import CardComponent from "../../components/";

const HomePage = () => {
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []); // Thêm mảng phụ thuộc trống để chỉ gọi hàm fetchAllTypeProduct một lần khi component mount

  return (
    <>
      <div
        style={{
          padding: " 0 120px",
          backgroundColor: "#f2f4f7",
          height: "2000px",
          paddingTop: "20px"
        }}
      >
        {/* <WrapperTypeProduct>
          {arr.map((item, index) => (
            <ProductTypeItem key={index}>{item}</ProductTypeItem>
          ))}
        </WrapperTypeProduct>*/}

        <div
          id="container"
          style={{ backgroundColor: "#efefef", padding: "0 120px" }}
        ></div>
        <SliderComponent arrImages={[slider1, slider3]} />
        <div
          style={{
            marginTop: "0px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        ></div>
        <InfoSection />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",

          }}
        ></div>
        <div style={{ alignItems: "center" }}>
          <OutstandingPhonePage />
        </div>
       
      </div>
      <Footer />
    </>
  );
};
export default HomePage;

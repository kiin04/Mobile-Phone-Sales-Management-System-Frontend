// src/components/Footer/InfoSection.js

import React from "react";
import chinhHangIcon from "../../assets/images/chinhHangIcon.png";
import vanChuyenIcon from "../../assets/images/vanChuyenIcon.png";
import doiTraIcon from "../../assets/images/doiTraIcon.png";

const InfoSection = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "20px 0px",
      marginTop: "40px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={chinhHangIcon} alt="Sản phẩm chính hãng" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0 }}>Sản phẩm</p>
          <p style={{ margin: 0 }}><strong>CHÍNH HÃNG</strong></p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={vanChuyenIcon} alt="Miễn phí vận chuyển" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0 }}>Miễn phí vận chuyển</p>
          <p style={{ margin: 0 }}><strong>TOÀN QUỐC</strong></p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={doiTraIcon} alt="Thủ tục đổi trả dễ dàng" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0 }}>Thủ tục đổi trả</p>
          <p style={{ margin: 0 }}><strong>DỄ DÀNG</strong></p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

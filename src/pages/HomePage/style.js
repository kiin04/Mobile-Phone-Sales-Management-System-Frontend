import styled from "styled-components";

export const WrapperTypeProduct = styled.div`

display: inline-block;
  align-items: center;
  gap: 24px; 
  justify-content: flex-start;
  height: 48px;
  padding: 10px 32px;
  font-size: 14px;
 font-weight: lighter; 
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
 // background-color: #f44336;
 background-color:rgb(251, 237, 224, 1);
    &:hover {
    transform: translateY(-2px); 
  }
`

export const ProductTypeItem = styled.div`
display: inline-block;
  padding: 5.5px 15px; /* Padding cho mỗi mục */
  background-color:#f44336 ; /* Màu nền mặc định */
  border-radius: 8px; /* Bo góc cho các mục */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  font-size: 14px; /* Kích thước chữ */
  font-weight:normal;/* Chữ đậm */
  color: black; /* Màu chữ mặc định */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Hiệu ứng hover */
  height:40px;
  text-align: center;
  border: 1px solid #f44336;
  color: #fff;    
  line-height:37px;
  margin: 2px;
  flex-grow:1;
  

  &:hover {
    background-color: #FF5733;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  color:#fff;
  border-radius:10px;
  transform: scale(1.05);
    transform: translateY(-10px); /* Nâng khối lên một chút khi hover */
  }

    `




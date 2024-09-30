import { Radio,Col, Image } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComopnent/ButtonComponent";

export const WapperStyleImageSmall = styled(Image)`
        height: 76px;
`
export const WapperStyleImage = styled(Image)`
        height: 76px;
`

export const WapperStyleNameProduct = styled.h1`
    font-size: 24px;
    font-weight: 500;
    color: #333;
    font-family: 'Nunito Sans', 'sans-serif';
`
export const WapperStyleAssess = styled.span`
    font-size: 12px;
    font-weight: 300;
`
export const WapperTextPrice = styled.span`
    font-size: 27px;
    line-height: 32px;
    color: #C92127;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 700;
`
export const WapperPriceBlock = styled.div`
    padding: 50px 0 50px 0;
    border-bottom: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const WapperQualityProduct = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
`
export const WapperQualityCountProduct = styled.label`
    font-size: 20px;
    font-weight: 500;
    color: #5b5b5b;
    padding: 0 8px 0 0;
    margin-bottom: 0;
    text-align: left;
    max-width: 200px;
    min-width: 150px;
`
export const WapperButtonMore = styled(ButtonComponent)`
    width: 150px;
    height: 32px;
    margin-top: 20px;
    font-size: medium;
    justify-content: center;
    align-items: center;
    display: flex;
   
   
    
  
`
export const WrapperOutStanding =styled.div`
margin-top: 0px;
color: #d70018;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: capitalize;
    text-align:center;


`
export const WrapperInfoProduct =styled.div`
margin-top: 0px;
color: #d70018;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: capitalize;
    text-align:center;
`

export const StyledRadioButton = styled(Radio.Button)`
  width: 120px;
  height: 60px;
  border-radius: 10px;
  margin: 0 10px;
  margin-bottom:8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  border: 1px solid #e0e0e0;
  font-size:14px;

  &:hover {
    border-color: #c92127;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #fff;
    border-color: #c92127;
    color: #c92127;
  }
`
export const StyledColorButton = styled(Radio.Button)`

width: 120px; 
  height: 80px; 
  border-radius: 10px;
  margin: 0 10px;
  margin-bottom: 8px;
  text-align: center;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
  font-weight: bold;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s, background-color 0.3s;

  /* Hiệu ứng hover */
  &:hover {
    border-color: #c92127;
    background-color: #f9f9f9;
  }

  /* Khi nút được chọn */
  &.ant-radio-button-wrapper-checked {
    background-color: #fff;
    border-color: #c92127;
    color: #c92127;
  }
`






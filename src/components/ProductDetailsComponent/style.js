import { Col, Image } from "antd";
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
    font-size: 32px;
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
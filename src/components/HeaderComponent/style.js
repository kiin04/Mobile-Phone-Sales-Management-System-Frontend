import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
padding: 20px 120px;
background-color: #008bd4;
align-items:center;
gap: 16px;
flex-wrap:nowrap;
    // fixid top (con loi)
    // left: 50%;
    // position: fixed;
    // top: 0;
    // transform: translateX(-50%);
    // width: 100%;

`

export const WrapperTextHeader = styled.span`
font-size:18px;
color:#fff;
font-weight:bold;
text-align : left;
cursor: pointer;
padding: 10px 15px;



`
export const WrapperTextListHeader = styled.div`
font-size: 15px;
color:#fff;
gap:10px;
display:flex;
align-items:center;
cursor: pointer;
padding:10px 15px;

&:hover {
  background-color:#ff5733;;
  color:#fff;
  border-radius:10px;
}


`
export const WrapperShoppingHeader = styled.div `
display:flex;
font-size:15px;
color:#fff;
gap:10px;
margin-left: 30px;
align-items:center;
cursor: pointer;
padding:10px 15px;

&:hover {
  background-color:#369cd1;;
  color:#fff;
  border-radius:10px;
}


`

export const WrapperAccountHeader = styled.div `
display:flex;
align-items:center;
font-size:15px;
color:#fff;
gap:10px;
margin-left: 20px;
cursor: pointer;
padding: 10px 3px;
justify-content: center;

&:hover {
  background-color:#369cd1;;
  color:#fff;
  border-radius:10px;
}


`
export const WrapperShipperHeader = styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  color: #fff;
  gap: 10px;
  margin-left: 20px;
cursor: pointer;
padding:10px 15px;
margin-left: 30px;

&:hover {
  background-color:#369cd1;;
  color:#fff;
  border-radius:10px;
}
`
export const WrapperContentPopup = styled.p`
cursor: pointer;
&:hover {
      color: #4588b5;
}
`;



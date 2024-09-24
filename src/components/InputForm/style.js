import { Input } from "antd";
import styled from "styled-components";

export const WapperInputStyle = styled(Input)`
        border-top: none;
        border-right: none;
        border-left: none;
        outline: none;
                &:hover {
                        border-color: #ff0000;
                        background-color: #ffffff;
                }
                        &:focus{
                            border-color: #ff0000;
                            box-shadow: none;   
                        }
                        
`
export const WapperInputPassword = styled(Input.Password)`
        border-top: none;
        border-right: none;
        border-left: none;      
        outline: none;
        &:hover {
                        border-color: #ff0000;
                        background-color: #ffffff;
                }
                        // &:focus{
                        //     border-color: #ff0000; !important
                        //     box-shadow: none;    !important
                        // }

                            &:focus-within{
                            border-color: #ff0000 ; !important
                            box-shadow: none  ;  !important
                        }
                            
`
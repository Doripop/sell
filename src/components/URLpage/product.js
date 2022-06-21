import React from "react";
import styled from "styled-components";
import { Box, Inside } from "../../shard/Sstyled";
const Product = () => {

    return (
        <Box>
            <Inside style={{borderBottom:"1px solid rgb(250, 250, 250)"}}>
                <span style={{fontSize:'18px'}}>
                    상품 0
                </span>
                <div> ddd </div>
            </Inside>
            <Inside>
                <span>등록된 상품이 없습니다.</span>
            </Inside>
        </Box>
    )
}



export default Product;
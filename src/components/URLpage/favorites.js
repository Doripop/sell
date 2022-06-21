import React from "react";
import { Box, Inside } from "../../shard/Sstyled";
const Favorites = () => {
    return (
        <Box>
            <Inside style={{ borderBottom: "1px solid rgb(250, 250, 250)" }}>
                <span style={{ fontSize: '18px' }}>
                    찜 0
                </span>
            </Inside>
            <Inside>
                <span>찜한 상품이 없습니다.</span>
            </Inside>
        </Box>
    )
}

export default Favorites;
import React from "react";
import { Box, Inside } from "../../shard/Sstyled";
const Reviews = () => {
    return (
        <Box>
            <Inside style={{ borderBottom: "1px solid rgb(250, 250, 250)" }}>
                <span style={{ fontSize: '18px' }}>
                    상점후기 0
                </span>
                {/* <div> ddd </div> */}
            </Inside>
            <Inside>
                <span>상점후기가 없습니다.</span>
            </Inside>
        </Box>
    )
}

export default Reviews;
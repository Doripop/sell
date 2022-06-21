import React from "react";
import { Box, Inside } from "../../shard/Sstyled";
const Followings = () => {
    return (
        <Box>
            <Inside style={{ borderBottom: "1px solid rgb(250, 250, 250)" }}>
                <span style={{ fontSize: '18px' }}>
                    팔로잉 0
                </span>
                {/* <div> ddd </div> */}
            </Inside>
            <Inside>
                <span>아직 팔로우한 사람이 없습니다.</span>
            </Inside>
        </Box>
    )
}

export default Followings;
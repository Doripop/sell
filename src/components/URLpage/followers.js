import React from "react";
import { Box, Inside } from "../../shard/Sstyled";
const Followers = () => {
    return (
        <Box>
            <Inside style={{ borderBottom: "1px solid rgb(250, 250, 250)" }}>
                <span style={{ fontSize: '18px' }}>
                    팔로워 0
                </span>
            </Inside>
            <Inside>
                <span>아직 이 상점을 팔로우한 사람이 없습니다.</span>
            </Inside>
        </Box>
    )
}

export default Followers;
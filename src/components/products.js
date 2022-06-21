import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom"
import Product from "./URLpage/product";
import Favorites from "./URLpage/favorites";
import Followers from "./URLpage/followers";
import Followings from "./URLpage/followings";
import Comments from "./URLpage/comments";
import Reviews from "./URLpage/reviews";
import { useDispatch, useSelector } from "react-redux"
import { changeComment, changeNicname, userinfoLoadSV } from "../redux/modules/userInfo";


function Mypage(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(userinfoLoadSV());
    }, [dispatch]);

    // const mypage_list = useSelector((state) => state.userinfo.list);
    //여기서 뭘 받고 리스트 비교후에 넘길지 아니면 걍 로그인된 정보 하나만 사용할지
    //받아온거 뿌려주기만하면됩니다.

    const [unclick, setUnclick] = useState("none")
    const [click, setClick] = useState("flex")
    const clickevent = () => {
        setClick("none")
        setUnclick("flex")
    }
    const unclickevent = () => {
        setClick("flex")
        setUnclick("none")
    }
    const [clickCom, setClickcom] = useState("none")
    const [unclickCom, setUnclickcom] = useState("flex")
    const clickC = () => {
        setUnclickcom("none")
        setClickcom("flex")
    }
    const unclickC = () => {
        setUnclickcom("flex")
        setClickcom("none")
    }
    const changeNIC = useRef(null)
    const changeCom = useRef(null)

    const changeInfo = () => {
        dispatch(changeNicname(changeNIC.current.value))
    }
    const changeInfoCom = () => {
        dispatch(changeComment(changeCom.current.value))
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", flexDirection: "row" }}>
                    <Mybox />
                    <Sidebox>
                        <span style={{ display: "flex" }}> 여기에 닉네임 <Btn style={{ display: click }} onClick={() => { clickevent() }}>상점명 수정</Btn>
                            <input ref={changeNIC} type="text" placeholder="닉네임변경" style={{ display: unclick }}></input>
                            <button style={{ display: unclick }} onClick={() => { unclickevent(); changeInfo() }}>수정</button>
                        </span>
                        <Insidebox>
                            <div style={{ marginRight: "20px" }}>
                                <Icon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAfBJREFUSA3tU79rFFEQntkcuBesDF5pdyRFrjNaiJBgERA0pEh1P4yCC4rWFiH/gIWN1W4iIclZeKRIlS6gSZkUQQsbOwtBwUp2n4f3xm827LK32eICd90NHDvvm+/N9+bHMcGioHEkInfVH7Yx86ey155n2WlWTCQ/hMQZtojmY6ae67gVxxhaGpWIConQhBFzH1XYZQVGaWL5obbr3ihFNDcTLVLoN06KhICfdTdbt/IxE9SfG7/xLI93/ebtKGi+y+N6DoPGTwfD+iNbq26WIAcvr+AV1Z6V6SyuvhDVLNMFvEdSw6xrF/jIzUKfIcR7pvvvjXQ6E3EiEY6+/36NS5OY3yvZbk0ll8PNR3dI+DEe8eSvvzqT4JHfugF/HZOfMxtNL8E1p+ZWDdyJS3vLIovYxVM8WV82m5CB/QL2EcRrxDKvW6QxJg5R3eG5Lwvwr2bunID/DcI3QfxQ9t6vlzSIsr5YkRcIVFNy4ohch7uCRHHfUjiumB7k4PMwKgN/Tg8lLu3rdyR/Uk2ct7FQviMDn+NlyLOxUW12+DiLW2v95Ix1PcavnZzzX7Gyhs3VlU+tWAgi7tPdIGXBCf16KoR1/+p6/fE+blD3wOkTGi9DtkOX8gtnpIPvm8mlUhaTxzMq7ssA6Lh1AzSpmPIfjjO10v2iE7IAAAAASUVORK5CYII=" />
                                상점오픈일 1일
                            </div>
                            <div style={{ marginRight: "20px" }}>
                                <Icon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQBJREFUSA1jZCASNOz/z3L34Z1aBkaGZLCW/wxzleVVmhscGf8QYwQLMYpAakCW/GdgqGMAElBQBxQDMethAvhoJnySKHIwnyALYhNDlkdiE28RkiZymMRbBIwTDAuwiWEogggQHUegiAfHCSy4oIkBh7kjQJgxdtHtUIZ/jJP+M/yXoIV/GRkYXzAw/c9joqUlIIeDPQD0CPGpjkLvMoG8BfYehQbh0g4LOkZcCkDiMQtuIwocfAqhcksSVHGaR8egI8Kl1FAy6iOyQ5HoQhVkA3qqIiVVjsYR2XE0woIOubBFZsPCD1kMmQ2TR6bxBx20ZAcbAmQjawSzCckjaQAAJL9HBV3GwxoAAAAASUVORK5CYII=" />
                                상점방문수 7명
                            </div>
                            <div style={{ marginRight: "20px" }}>
                                <Icon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAl1JREFUSA21Vc9PE1EQnnktW2yIFy9GiCduSki4QjSGwA3qj248q/HCwQtnwg//CxKrMd4WMO2RQrxwkbQmBI0XExMxqQk3TTAt7Q4zu91l231btrq85KWz33wz39v3vn0F6HOYO7nHMvssA+ynwPxgXrebjc9So9LGbeue9StuvYpLFJ592lgHomsynbiP4thC+XLuCQDN8Rb8limxi8VTi7V1Ztm8SVQ/JICriPhUWhNRwRHFzJg1Y/24SO7CN+KGSNAotEVKGzPF1zJZsCSYk2POfwvld+8vsNg0dzq+klXPvYYSCyY54Xh41G/PlbDLRu3T+gEXZ1UKH1rTxffBRuZu7oHdoi3GTtRAZpxd+C2YD8aRW7dCK4pF3jA5y9v0tltEmggmOeEIV2oE143IxJedT4tcMAmARwjGC12xYG4Oj4TbrtFSMV+e/0kEw9psYiDWFBDuJ9YvohEiVWXrPkbkk4QrSim69DcCTFXV0CBUENBOcvndvQYNrKrCVOkPXyhfu5OhZ4SmAlxWqcyIMzlmyzVDvBCAtXd3tmppB0c2BNGtECcAKMKX1mxxLQCtmds5sIFWA1goFCMI6H5HGMMQKeNVqIsOC5Gg4gvxfXV5hmAj+EJj6YlDvkr+hhcTQFqNZ4EnN9RhXSQxgkD+pfpoe36Pn/nKiRhiBj4n8LaLRWykJSBwz1lbhrXN2eINSfkkfqN93sJoIW7oHHyrfn74/IfUa3hGEI5/qWIcQ/Tqqs85RugQggEjeUO0jdAhZN21vvOBHesX9m+oZ4QOIaeVfLiJDfdG8NqdARu11RN7gt5lAAAAAElFTkSuQmCC" />
                                상품판매 11회
                            </div>
                            <div style={{ marginRight: "20px" }}>
                                <Icon src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQlJREFUSA1jZEACoceOcf5k+HqV4T+DIpIwnMnEzGyywcLpLEgg4MQ+439//56BSyIzGBnuszNwa6+2svoOE2aCMUD0r/9fq3FZgqyOIBvoULBZSArhFvmd3qfOwMhQiiRHGRNoFthMqClwixh//536/z8DG2WmI3SDzAKZCRMBWxRwbG8kUMIZJkgtGmQmyGyQeUzRJ07w/WP430ctw9HNAZkNsoPly9+vLQwM/yXQFVCN//+/BMgOFkZWpnmM/xgXEmOwGAvfdZg6EPsVwycTGB8vzcT4F6/8kJRkDDi2J40eLmf59///THpYBM+wtLZs1CKyQ3g06EaDDh4Co4kBHhSkMoZf0AEAMN1RWGgFcjgAAAAASUVORK5CYII=" />
                                택배발송 11회
                            </div>
                        </Insidebox>
                        <Btn style={{ display: unclickCom }} onClick={() => { clickC() }}>소개글 수정</Btn>
                        <div style={{ display: clickCom }}>
                            <Tea ref={changeCom}></Tea>
                            <Okbut onClick={() => { unclickC(); changeInfoCom() }}>확인</Okbut>
                        </div>

                    </Sidebox>
                </div>




                <div style={{ marginTop: "20px", marginLeft: "-40px" }}>

                    <ul style={{ display: "flex" }}>
                        <List style={{ borderLeft: "1px solid rgb(238, 238, 238)" }}
                            onClick={() => { navigate("/mypage/product") }}>
                            상품
                        </List>
                        <List onClick={() => { navigate("/mypage/comments") }}>상점문의</List>
                        <List onClick={() => { navigate("/mypage/favorites") }}>찜</List>
                        <List onClick={() => { navigate("/mypage/reviews") }}>상점후기</List>
                        <List onClick={() => { navigate("/mypage/followings") }}>팔로잉</List>
                        <List onClick={() => { navigate("/mypage/followers") }}>팔로워</List>
                    </ul>

                </div>
            </div>

            <Routes>
                <Route path='product' element={<Product />} />
                <Route path='comments' element={<Comments />} />
                <Route path='favorites' element={<Favorites />} />
                <Route path='followers' element={<Followers />} />
                <Route path='followings' element={<Followings />} />
                <Route path='reviews' element={<Reviews />} />
            </Routes>

        </>
    )
};

const Sidebox = styled.div`
    width: 650px;
    padding: 30px 30px;
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    height: 250px;
    flex-direction: column;
`;

const Insidebox = styled.div`
    height: 45px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-top: 1px solid rgb(250, 250, 250);
    border-bottom: 1px solid rgb(250, 250, 250);
    margin-bottom: 150px;
    flex-shrink: 0;
    margin-right: 30px;
`;

const Mybox = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 0;
    width: 310px;
    height: 310px;
    background-image: url("https://m.bunjang.co.kr/pc-static/media/pattern-shop.066ca385.png");
    background-color: rgb(181, 181, 181);
    z-index:"-1";
`;

const Icon = styled.img`
    width:14px;
    height:13px;
    aspect-ratio: auto 14 / 13;
`;

const Btn = styled.button`
    width: 65px;
    height: 20px;
    /* display: flex; */
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 5px;
    color: rgb(136, 136, 136);
    border: 1px solid rgb(238, 238, 238);
    font-size: 11px;
    margin-left:20px;
    justify-content:center;
`;

const List = styled.li`
    height: 50px;
    width:170px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(255, 255, 255);
    background: rgb(255, 255, 255);
    color: rgb(33, 33, 33);
    font-weight: 600;
`;

const Tea = styled.textarea`
    -webkit-box-flex: 1;
    flex-grow: 1;
    resize: none;
    border: 1px solid rgb(238, 238, 238);
    height: 150px;
    margin-top: -132px;
`;

const Okbut = styled.button`
    width: 100px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    background: rgb(250, 250, 250);
    color: rgb(136, 136, 136);
    height: 150px;
    margin-top: -132px;
`;


export default Mypage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/Home.css"
import { itemLoad } from "../redux/modules/searchSV";
import { useDispatch, useSelector } from "react-redux"


const Search = () => {
    const parm = useParams()
    const dispatch = useDispatch()
    const searchItem_list = useSelector((state) => state.searchSV.list);
    const [way, setWay] = useState("default")

    console.log(way)
    const wayChange = (e) =>{
        setWay(e)
    }

    useEffect(() => {
        dispatch(itemLoad(parm.text, way));
    }, [dispatch, parm.text, way]);

    useEffect(()=>{
        setWay('default')
    },[parm.text])

    

    return (
        <>
            <div style={{ flexDirection: "column" }}>


                <Minibox>
                    <Rightbox onClick={()=>{wayChange("default")}}>
                        정확도순
                    </Rightbox>
                    <Rightbox onClick={()=>{wayChange("time")}}>
                        최신순
                    </Rightbox>
                    <Rightbox onClick={()=>{wayChange("a_price")}}>
                        저가순
                    </Rightbox>
                    <div onClick={()=>{wayChange("d_price")}}>
                        고가순
                    </div>
                </Minibox>
                {searchItem_list.map((item, i) => (
                    <div className="item" style={{width:"200px", height:"300px"}} key={i}>
                        <div className="thumb">
                            <img src={item.imageUrl} alt="" />
                        </div>
                        <div className="prdInfo">
                            <p className="prdTitle">
                                {item.title}
                            </p>
                            <p className="price">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}<span>원</span></p>
                        </div>
                    </div>

                ))}


            </div>

        </>
    )
}


const Minibox = styled.div`
width:100%;
height:20px;
display:flex;
/* align-items:center; */
justify-content:flex-end;
`;

const Rightbox = styled.div`
border-right: 1px solid black;

`;

export default Search;
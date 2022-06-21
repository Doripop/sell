import React, { useRef, useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import homeCss from "../css/Home.css";
import axios from "axios";
import prevBtn from "../img/prev.png";
import nextBtn from "../img/next.png";
import subBn from "../img/subBn.png";

const Home = () => {
  let allPrd = useSelector((state) => state.Product_.prdItem.Items)
  let prdlist = allPrd === undefined ? [] :allPrd
  console.log(prdlist)

 //배너 관련!!!!!!!!!
  const bannerPosition = useRef();
  const leftBtn = useRef();
  const rightBtn = useRef();
  const [img, setImg] = useState([]);
  const [left, setLeft] = useState(0);
  
  
  
  //메인배너 이미지 가져오기
  const imageData = async () => {
    const response = await axios
      .get("http://localhost:5001/imageData")
      .then((response) => {
        setImg(response.data);
      });
  };

 
  //api데이터 가져오기 실행
  useEffect(() => {
    imageData();
  }, []);

  //배너아이템 포지션 제어하기
  useEffect(() => {
    //left값 주입
    bannerPosition.current.style.left = left;
  }, [img, left]);

  const prev = () => {
    // left의 값이 총 아이템의 가로 사이즈 * -1와 같지 않다면 left왼쪽으로 -1024씩 이동
    if (left !== (img.length - 1) * 1024 * -1) {
      setLeft(left + -1024);
    }
  };
  const next = () => {
    // left의 값이 영이아니고, 영보다 작다면 +1024씩 이동
    if (left === 0) {
      return null;
    } else if (left <= 0) {
      setLeft(left + 1024);
    }
  };

  return (
    <div className="container">
      <div className="mainBnContainer">
        <div className="bnContent">
          <div
            className="bnItem"
            ref={bannerPosition}
            style={{ left: `${left}px` }}
          >
            {img.map((i, idx) => {
              return <img src={i.img} alt="" key={idx} />;
            })}
          </div>
          {left !== (img.length - 1) * 1024 * -1 ? (
            <button onClick={prev} ref={leftBtn} className="leftBtn">
              <img src={prevBtn} alt="prev" width="15px" />
            </button>
          ) : null}
          {left <= 0 && left !== 0 ? (
            <button onClick={next} ref={rightBtn} className="rightBtn">
              <img src={nextBtn} alt="next" width="15px" />
            </button>
          ) : null}
        </div>
      </div>
      <div className="subBn">
        <div className="subBnItem">
          <img src={subBn} alt="" />
        </div>
      </div>

      <div className="prdListContainer">
        <div className="title">오늘의 상품 추천</div>
        <div className="prdContent">
          {prdlist.map((p, idx) => {
            return (
              <div className="item" key={idx}>
                <div className="thumb">
                  <img src={p.imageUrl} alt="" />
                </div>
                <div className="prdInfo">
                  <p className="prdTitle">
                  {p.title}
                  </p>
                  <p className="price">{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}<span>원</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { postUpload } from "../redux/modules/posting";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../shard/firebase";
import styled from "styled-components";
import "../css/New.css";
const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const title = React.useRef(null);
  const price = React.useRef(null);
  const comment = React.useRef(null);
  const count = React.useRef(null);
  const img = React.useRef(null);
  const file_link_ref = React.useRef(null);
  const [titleLeng, setTitleLeng] = useState(0);
  console.log(titleLeng);
  const [address, setAddress] = useState("지역설정안함");
  const [item, setItem] = useState("중고상품");
  const [trade, setTrade] = useState("교환불가");

  const addressClick = (e) => {
    setAddress(e.target.value);
  };
  const itemClick = (e) => {
    setItem(e.target.value);
  };
  const tradeClick = (e) => {
    setTrade(e.target.value);
  };

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const fileUp = async () => {
    const uploadfile = await uploadBytes(
      ref(storage, `images/${img.current.files[0].name}`),
      img.current.files[0]
    );
    const file_url = await getDownloadURL(uploadfile.ref);
    file_link_ref.current = { url: file_url };
  };

  const addPost = () => {
    window.setTimeout(  () => {
      dispatch(
        postUpload({
          imageUrl: file_link_ref.current.url,
          title: title.current.value,
          location: address,
          condition: item,
          exchange: trade,
          price: parseInt(price.current.value),
          content: comment.current.value,
          count: parseInt(count.current.value),
        })
      );
    }, 2500);
  };

  return (
    <div className="newContainer">
      <div className="myPrdBox">
        <div className="myPrdMenu">
          <p className="selected">상품등록</p>
          <p>상품관리</p>
          <p>구매/판매 내역</p>
        </div>
      </div>

      <div className="newPrdContent">
        <div className="title">
          기본정보 <span>*필수항목</span>
        </div>
      </div>
      <div className="contentBox">
        <section>
          <p className="sectionTitle">상품이미지</p>
          <div className="fileBox">
            <label htmlFor="img">
              {imageSrc && <Image src={imageSrc} alt="preview-img" />}
            </label>

            <input
              id="img"
              type="file"
              ref={img}
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
              accept="image/jpg, image/jpeg, image/png"
            />
            <p>
              <strong>* 상품 이미지는 640x640에 최적화 되어 있습니다.</strong>
              <br />
              - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로
              보여집니다.
              <br />
              - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.
              <br />
              - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.
              <br />
              - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
              <br />
              - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
              <br />
              최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당
              이미지 최대 10M)
            </p>
          </div>
        </section>
        <section className="titleSec">
          <p>제목</p>
          <div>
            <input
              ref={title}
              type="text"
              maxLength="40"
              onChange={(e) => {
                setTitleLeng(e.target.value.length);
              }}
            />
            {titleLeng}/40
          </div>
        </section>
        <section className="adrressBox">
          <p>거래지역</p>
          <div>
            <div>
              <label htmlFor="내위치">내위치</label>
              <input
                type="radio"
                id="내위치"
                name="거래지역"
                value={"내 위치"}
                onClick={addressClick}
              />

              <label htmlFor="최근지역">최근지역</label>
              <input
                type="radio"
                id="최근지역"
                name="거래지역"
                value={"최근지역"}
                onClick={addressClick}
              />

              <label htmlFor="주소">주소</label>
              <input
                type="radio"
                id="주소"
                name="거래지역"
                value={"주소"}
                onClick={addressClick}
              />

              <label htmlFor="지역설정안함">지역설정안함</label>
              <input
                type="radio"
                id="지역설정안함"
                name="거래지역"
                defaultChecked
                value={"지역설정안함"}
                onClick={addressClick}
              />
            </div>

            <div className="selectedInfo">{address}</div>
          </div>
        </section>
        <section className="radioBox">
          <p>상태</p>
          <div>
            <input
              defaultChecked
              type="radio"
              id="중고상품"
              name="상태"
              value={"중고상품"}
              onClick={itemClick}
            />
            <label htmlFor="중고상품">중고상품</label>

            <input
              type="radio"
              id="새상품"
              name="상태"
              value={"새상품"}
              onClick={itemClick}
            />
            <label htmlFor="새상품">새상품</label>
          </div>
        </section>
        <section className="radioBox">
          <p>교환</p>
          <div>
            <input
              defaultChecked
              type="radio"
              id="교환불가"
              name="교환"
              value={"교환불가"}
              onClick={tradeClick}
            />
            <label htmlFor="교환불가">교환불가</label>

            <input
              type="radio"
              id="a"
              name="교환"
              value={"교환가능"}
              onClick={tradeClick}
            />
            <label htmlFor="a">교환가능</label>
          </div>
        </section>
        <section className="priceSec">
          <p>가격</p>
          <div>
            <div>
              <input
                ref={price}
                type="text"
                placeholder="숫자만 입력해주세요."
              />
            </div>
            <span>원</span>
          </div>
        </section>
        <section className="contentSec">
          <p>설명</p>
          <div>
            <textarea
              ref={comment}
              type="text"
              rows="6"
              placeholder="여러 장의 상품 사진 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. 문의를 줄이고 더 쉽게 판매할 수 있어요."
            />
          </div>
        </section>
        <section className="countSec">
          <p>수량</p>
          <div>
            <div>
              <input ref={count} type="text" defaultValue={1} />
            </div>
            <span>개</span>
          </div>
        </section>
      </div>
      <div className="newPrdFooter">
        <div>
          <button
            onClick={() => {
              fileUp();
              addPost();
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default New;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../shard/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../css/Signup.css";
import appImg from "../img/appimg.svg";

const Signup = ({ loginClose }) => {
  const [location, setLocation] = useState("signIn");
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const file_link_ref = useRef("");
  const img = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [userprofileUrl, setUserprofileUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

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
      img === null 
      ? null 
      : ref(storage, `images/${img.current.files[0].name}`),img.current.files[0]
     
    );
    const file_url = await getDownloadURL(uploadfile.ref);
    file_link_ref.current = { url: file_url };
    console.log(file_link_ref.current.url);
  };

  //회원가입 요청 로직
  const userInfo = {
    email: email,
    password: password,
    nickname: nickname,
    confirmpassword: confirmpassword,
    userprofileUrl: file_link_ref.current.url,
  };
  function userRegister() {
    if (location === "signIn") {
      return setLocation("signup");
    } else if (location === "signup") {
      if (!reg_email.test(email)){
        return alert('이메일 형식을 지켜주세요!')
      }else if(password !== confirmpassword){
        return alert('비밀번호가 일치하지 않아요!')
      }else{
        setTimeout(async () => {
          console.log("회원가입 요청");
          await axios
            .post("http://13.125.112.232/api/user/signup", userInfo)
            .then((Response) => {
              console.log(Response.data.errorMesssage);
            })
            .catch(function (error) {
              let eMsg = error.response.data.errorMessage
              alert(eMsg)             
            });
          console.log(userInfo);
        }, 1500);
      }
    }
  }

  //로그인 요청 로직
  async function userLogin() {
    if (location === "signup") {
      setLocation("signIn");
    } else if (location === "signIn") {
      console.log("로그인 요청!");
      await axios
        .post(
          "http://13.125.112.232/api/user/login",
          {
            email: email,
            password: password,
          }
        )
        .then((response) => {
          localStorage.setItem("userToken", response.data.token);
          window.location.replace("/");
        });
    }
  }

  useEffect(() => {
    if (location === "signup") {
      nickRef.current.focus();
    } else if (location === "signIn") {
      emailRef.current.focus();
    }
  }, [location]);

  return (
    <div className="signupModal">
      <div className="background" onClick={loginClose}></div>
      <div className="modal">
        <div className="titleBox">
          <img src={appImg} alt="" className="appImg" />
          <h2 className="title">번개장터로 중고거래 시작하기</h2>
          <p className="subTitle">간편하게 가입하고 상품을 확인하세요</p>
        </div>
        <div>
          <form action="" className="loginFrom">
            {location === "signup" ? (
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  ref={nickRef}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </label>
            ) : null}

            <label htmlFor="">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                ref={emailRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                placeholder="비밀번호(영문,숫자,특수문자포함 6글자 이상)"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            {location === "signup" ? (
              <>
                <label htmlFor="">
                  <input
                    type="password"
                    placeholder="비밀번호 재입력"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="file"
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                    }}
                    accept="image/jpg, image/jpeg, image/png"
                    ref={img}
                  />
                </label>
              </>
            ) : null}

            <div className="buttonArea">
              <p
                className={`${location === "signup" ? "on" : "off"}`}
                onClick={() => {
                  fileUp();
                  userRegister();
                }}
              >
                회원가입
              </p>
              <p
                className={`${location === "signIn" ? "on" : "off"}`}
                onClick={() => {
                  userLogin();
                }}
              >
                로그인
              </p>
            </div>
          </form>
          <button className="closeBtn" onClick={loginClose}>
            X
          </button>
        </div>
        <div className="subInfo">
          도움이 필요하면 이메일 또는 고객센터1670-2910로 문의 부탁드립니다.
          <br />
          고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)
        </div>
      </div>
    </div>
  );
};

export default Signup;

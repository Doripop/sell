import React,{useState, useEffect} from "react";
import AppLayout from "./components/AppLayout";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import {useDispatch} from "react-redux"
import {prdAll_list} from "./redux/modules/productSlice"

import Mypage from "./components/products"
import New from "./pages/New";
import Home from "./pages/Home";
import Search from "./components/search";
import { loginCheck } from "./redux/modules/userInfo";

function App() {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState("")
  
    //api데이터 가져오기 실행
    useEffect(() => {
      dispatch(prdAll_list())
    }, [dispatch]);

    useEffect(()=>{
      if(localStorage.getItem('userToken')){
        setIsLogin(true);
        dispatch(loginCheck());
      }else{
        setIsLogin(false);
      }   
    },[dispatch, isLogin])
  
 

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />}/>        
        <Route path="/mypage/*"  element={<Mypage />}/>
        <Route path="/search/:text/*"  element={<Search />}/>
        <Route path="/Product" element={<Product />}>
          <Route path="new" element={<New />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;

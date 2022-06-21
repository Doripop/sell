import axios from "axios";

const ADD = "new/Add"


const initialState = {
    list: [],
};

export function postAdd(post) {
    return { type: ADD, post };
}



export const postUpload = (post) => {
    let token = localStorage.getItem("userToken")
    console.log(post);
    return async function (dispacth) {
       await axios.post("http://13.125.112.232/market", post,{
            headers: {Authorization: 'Bearer ' + token }
           }).then((response) => {
            console.log(response.data);
            const newPost = {...post };
            dispacth(postAdd(newPost));
        });
  
    };
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "new/ADD": {
            const new_post = [...state.list, action.post];
            // console.log(new_post, "저장했으면 손!");
            return { list: new_post };
          }


        default:
      return state;
  }
}
import axios from "axios";



const LOAD = "search/LOAD";


const initialState = {
    list: [],
};


export function searchLOAD(search) {
    // console.log(search);
    return { type: LOAD, search };
}


export const itemLoad = (parm, way) => {
    // console.log(way)
    return  function (dispatch) {
        axios.get(`http://13.125.112.232/market/${parm}/${way}`).then((response) => {
            // console.log(response);

            let searchItem_list = [];
            response.data.findAllitem.forEach((res) => {
                searchItem_list.push({ ...res });
                // console.log(searchItem_list);
                dispatch(searchLOAD(searchItem_list));
            });
        });
    };
};



export default function reducer(state = initialState, action = {}) {
    switch (action.type) {




        case "search/LOAD": {
            // console.log(action.search);
            return {list: action.search};
        }


        default:
            return state;
    }
}
import React, { useReducer, useState,useEffect, useContext } from "react";
const AppContext=React.createContext();
const AgeContext=React.createContext();
import reducer from "./Reducer";

const API="https://hn.algolia.com/api/v1/search?";

const initialState={
    isLoading:true,
    query:"css",
    nbPages:0,
    page:0,
    hits:[],
}


const AppProvider=({children})=>{
// const [state, setstate] = useState(initialState)
   const [state, dispatch] = useReducer(reducer, initialState)


    const FetchApiData= async (url)=>{

        dispatch({
            type:"SET_LOADING"
        })

        try {
            const res= await fetch(url);
            const data=await res.json()
            console.log(data)
            dispatch({
                type:"GET_STORIES",
                payload: {
                    hits:data.hits,
                    nbPages:data.nbPages,
                },
            });
            
        } catch (error) {
          console.log("error")  
        }
    }

    // To Remove Post

    const RemovePost=(post_ID)=>{
         dispatch({ type:"REMOVE_POST", payload: post_ID})
    }
    // Search
    const searchPost=(searchQuery)=>{
        dispatch({
            type:"SEARCH_QUERY" ,
            payload:searchQuery,
    });
    };
    //   Pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
       
    };
    const getPrevPage=()=>{
        dispatch({
            type:"PREV_PAGE",
        });
    };


    useEffect(() => {
     FetchApiData(`${API}query=${state.query}&page=${state.page}`)
    },[state.query ,state.page])
    
    return<>
     <AppContext.Provider 
        value={{...state, RemovePost, searchPost, getNextPage, getPrevPage}}>
       <AgeContext.Provider value={"25"}>
        {children}
        </AgeContext.Provider>
     </AppContext.Provider>
    </>
}
// custom hook create
const useGlobalContext=()=>{
    return useContext(AppContext);
}
export{AppProvider,AppContext, AgeContext,useGlobalContext}
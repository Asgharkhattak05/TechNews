import React from 'react'
import { useEffect } from 'react';
import { useGlobalContext } from './Context';
import "./App.css";

const Stories = () => {

const {hits, nbPages,isLoading, RemovePost,objectID}= useGlobalContext();
    
     if(isLoading){
        return<>
            <h2 className='loading'>Loading. . . </h2>
        </>
     }
  return (
    <>
    <div className='stories-div'>
    {hits.map((curPost)=>{
        const{title , author, num_comments, objectID, url}= curPost;
        return <>
            <div className='card' key={objectID} >
                <h2>{title}</h2>
                <p>
                    By <span>{author}</span> | <span>{num_comments} Comments</span>
                </p>
                <div className='card-button'>
                    <a href={url} target="_blank" >Read More</a>
                    <a href='#' onClick={()=>RemovePost(objectID)}>Remove</a>
                </div>
            </div>
        </>
    })}
    </div>
    </>
  )
}

export default Stories
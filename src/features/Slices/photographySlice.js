import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import {CreatePhotography } from "../actions/photographyAction";


 const initialState={
    isLoading:false,
    isSuccess:false,
    GalleryData:[],
    errorMessage:"",
    isdeleted:false,

}

export  const  imagesSlice=createSlice({
    name:"imgSlice",
    initialState,
    reducers:{
        clearIsSuccess:(state)=>{
            state.isSuccess=false,
            state.isdeleted=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(CreatePhotography.pending,(state,action)=>{

            state.isLoading=true,
            state.isSuccess=false,
            state.errorMessage=""
        })
        .addCase(CreatePhotography.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.errorMessage="",
            state.GalleryData=action.payload       })
        .addCase(CreatePhotography.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            toast.error(action?.payload || "Something went wrong",{
                position:"top-center"
              })
        })

    }


})



export const { clearIsSuccess } = imagesSlice.actions;
export default imagesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import {CreatePhotography, GetPhotography } from "../actions/photographyAction";


 const initialState={
    isLoading:false,
    isSuccess:false,
    photographyData:[],
    errorMessage:"",
    isdeleted:false,
}

export  const  photographySlice=createSlice({
    name:"photographySlice",
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
            state. photographyData=action.payload       })
        .addCase(CreatePhotography.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            toast.error(action?.payload || "Something went wrong",{
                position:"top-center"
              })
          
        })
        .addCase(GetPhotography.pending,(state,action)=>{

            state.isLoading=true,
            state.isSuccess=false,
            state.errorMessage=""
        })
        .addCase(GetPhotography.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.errorMessage="",
            state. photographyData=action.payload       })
        .addCase(GetPhotography.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            toast.error(action?.payload || "Something went wrong",{
                position:"top-center"
              })


              
        })

    }


})



export const { clearIsSuccess } = photographySlice.actions;
export default photographySlice.reducer;
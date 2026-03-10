import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerdata : [],
    imageUrl : ""
};

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerdata = action.payload;
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        }
    },
});

export const { setBannerData, setImageUrl } = movieSlice.actions;

export default movieSlice.reducer;
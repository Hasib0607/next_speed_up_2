import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    home: null,
    headersetting: null,
    design: null,
    menu: null,
    brand: null,
    testimonial: null,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHome: (state, action: PayloadAction<any>) => {
            state.home = action.payload;
        },
        setHeader: (state, action: PayloadAction<any>) => {
            state.headersetting = action.payload;
        },
        setDesign: (state, action: PayloadAction<any>) => {
            state.design = action.payload;
        },
        setMenu: (state, action: PayloadAction<any>) => {
            state.menu = action.payload;
        },
        setBrand: (state, action: PayloadAction<any>) => {
            state.brand = action.payload;
        },
        setTestimonial: (state, action: PayloadAction<any>) => {
            state.testimonial = action.payload;
        },
    },
});

export const {
    setHome,
    setHeader,
    setDesign,
    setMenu,
    setBrand,
    setTestimonial,
} = homeSlice.actions;
// Export the reducer
export const { reducerPath, reducer } = homeSlice;

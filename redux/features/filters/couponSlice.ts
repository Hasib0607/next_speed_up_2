import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    couponResult: null,
<<<<<<< HEAD
=======
    couponDiscount: 0,
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
};

export const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        setCouponResult: (state, action: PayloadAction<any>) => {
            state.couponResult = action.payload;
        },
<<<<<<< HEAD
    },
});

export const { setCouponResult } = couponSlice.actions;
=======
        setCouponDiscount: (state, action: PayloadAction<any>) => {
            state.couponDiscount = action.payload;
        },
    },
});

export const { setCouponResult, setCouponDiscount } = couponSlice.actions;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

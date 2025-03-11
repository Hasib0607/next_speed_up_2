import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    selectedShippingArea: null,
<<<<<<< HEAD
=======
    shippingAreaCost: null,
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
};

export const shippingAreaFilterSlice = createSlice({
    name: 'shippingAreaFilter',
    initialState,
    reducers: {
        setSelectedShippingArea: (state, action: PayloadAction<any>) => {
            state.selectedShippingArea = action.payload;
        },
<<<<<<< HEAD
    },
});

export const { setSelectedShippingArea } = shippingAreaFilterSlice.actions;
=======
        setShippingAreaCost: (state, action: PayloadAction<any>) => {
            state.shippingAreaCost = action.payload;
        },
    },
});

export const { setSelectedShippingArea, setShippingAreaCost } =
    shippingAreaFilterSlice.actions;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

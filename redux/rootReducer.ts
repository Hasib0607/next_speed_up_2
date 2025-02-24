import { combineReducers } from 'redux';
import { apiSlice } from './features/api/apiSlice';
import { storeSlice } from './features/appStore/appStoreSlice';
import { blogSlice } from './features/blog/blogSlice';
import { cartSlice } from './features/cart/cartSlice';
import { categorySlice } from './features/category/categorySlice';
import { homeSlice } from './features/home/homeSlice';
import { pageSlice } from './features/page/pageSlice';
import { productSlice } from './features/products/productSlice';
import { filterSlice } from './features/filters/filterSlice';
import { authSlice } from './features/auth/authSlice';
import { userSlice } from './features/user/userSlice';
import { affiliateUserSlice } from './features/affiliateUser/affiliateUserSlice';
import { checkOutSlice } from './features/checkOut/checkOutSlice';
import { paymentFilterSlice } from './features/filters/paymentFilterSlice';
import { couponSlice } from './features/filters/couponSlice';
import { offerFilterSlice } from './features/filters/offerFilterSlice';

// import slices
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [homeSlice.reducerPath]: homeSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
    [checkOutSlice.reducerPath]: checkOutSlice.reducer,
    [storeSlice.reducerPath]: storeSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [pageSlice.reducerPath]: pageSlice.reducer,
    [blogSlice.reducerPath]: blogSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [affiliateUserSlice.reducerPath]: affiliateUserSlice.reducer,
    [filterSlice.reducerPath]: filterSlice.reducer,
    [paymentFilterSlice.reducerPath]: paymentFilterSlice.reducer,
    [offerFilterSlice.reducerPath]: offerFilterSlice.reducer,
    [couponSlice.reducerPath]: couponSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
});

export default rootReducer;

import {
    setCouponDiscount,
    setCouponResult,
} from '@/redux/features/filters/couponSlice';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';

export const handleCouponRemove = (dispatch: AppDispatch) => {
    dispatch(setCouponDiscount(0));
    dispatch(setCouponResult({ code: null, code_status: false }));
    toast.error('Coupon removed!');
};

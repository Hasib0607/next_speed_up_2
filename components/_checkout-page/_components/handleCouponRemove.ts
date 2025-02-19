import { setCouponResult } from '@/redux/features/filters/couponSlice';
import { toast } from 'react-toastify';

export const handleCouponRemove = (dispatch: any, setCouponDis: any) => {
    setCouponDis(0);
    dispatch(setCouponResult({ code: null, code_status: false }));
    toast.error('Coupon removed!');
};

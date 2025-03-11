import { setSelectPayment } from '@/redux/features/filters/paymentFilterSlice';
import { useDispatch } from 'react-redux';

export default function StoreLayer(design: any) {
    const dispatch = useDispatch();
    return dispatch(setSelectPayment(design));
}

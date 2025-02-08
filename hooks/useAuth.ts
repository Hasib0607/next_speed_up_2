'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Adjust the import based on your store structure

export default function useAuth(): boolean {
    const auth = useSelector((state: RootState) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}

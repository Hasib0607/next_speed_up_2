'use client';

import { useSelector } from 'react-redux';
import { card_pop_up_pages } from '@/utils/dynamic-import/cardPopUps/cardPopUps';
import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';

const CartPopUp = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const CartPopUpComponent =
        card_pop_up_pages[design?.product_card] || card_pop_up_pages[DEFAULT];

    return (
        <>
            {design?.product_card && CartPopUpComponent && (
                <CartPopUpComponent />
            )}
        </>
    );
};

export default CartPopUp;

import { card_pop_up_pages } from '@/utils/dynamic-import/cardPopUps/cardPopUps';
import { DEFAULT } from '@/consts';

const CartPopUp = ({ design }: any) => {
    const CartPopUpComponent =
        card_pop_up_pages[design?.product_card] || card_pop_up_pages[DEFAULT];

    return (
        <>
            {design?.product_card !== 'null' && CartPopUpComponent && (
                <CartPopUpComponent design={design} />
            )}
        </>
    );
};

export default CartPopUp;

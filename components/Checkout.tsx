import { checkout_pages } from '@/utils/dynamic-import/checkoutPages/checkoutPages';
import { DEFAULT } from '@/consts';

const Checkout = ({ design, appStore, headersetting }: any) => {
    
    const CheckoutComponent =
        checkout_pages[design?.checkout_page] || checkout_pages[DEFAULT];

    return (
        design?.checkout_page !== 'null' &&
        CheckoutComponent && (
            <CheckoutComponent
                design={design}
                appStore={appStore}
                headersetting={headersetting}
            />
        )
    );
};

export default Checkout;

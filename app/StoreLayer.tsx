// components
import CartPopUp from '@/components/CartPopUp';
import NotFound from './not-found';
// import AllMobileBottomMenu from "./mobileBottomMenu";

const StoreLayer = ({ children, appStore }: any) => {

    return (
        <>
            {appStore ? (
                <>
                    {children}
                    {/* <AllMobileBottomMenu/> */}
                    <CartPopUp />
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default StoreLayer;

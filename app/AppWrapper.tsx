'use client';

// import store form rtk
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import NotFound from './not-found';
import VisitorLayer from './VisitorLayer';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import EbitansCart from '@/components/EbitansCart';
import { DB_CART_STATUS, EXTRACT_HEADER_INFORMATION } from '@/consts';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// import Loading from '@/app/loadingx';

const AppWrapper = (props: any) => {
    const store_id = numberParser(props.appStore?.id) || null;

    const pathname = usePathname();

    useEffect(() => {
        const dbCartObj = { dbCart: props.dbCart, store_id }; // as Record<'dbCart'  | 'store_id', any>;
        saveToLocalStorage(DB_CART_STATUS, dbCartObj);
    }, [pathname, props.dbCart, store_id]);

    useEffect(() => {
        const { logo, currency, custom_design } =
            props.headersetting || {};

        const cHeadersettings = {
            logo,
            currency,
            custom_design,
            store_id,
        };
        saveToLocalStorage(EXTRACT_HEADER_INFORMATION, cHeadersettings);
    }, [pathname, props.headersetting, store_id]);

    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                // loading={<Loading design={design} />}
                persistor={persistor}
            >
                <VisitorLayer />
                {!props.appStore ? <NotFound /> : props.children}
                {props.dbCart && <EbitansCart />}
                <ToastContainer position="top-right" newestOnTop />
                <EbitansAnalytics store_id={store_id} />
            </PersistGate>
        </Provider>
    );
};
export default AppWrapper;

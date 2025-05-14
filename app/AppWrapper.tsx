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
import { DB_CART_STATUS } from '@/consts';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';

// import Loading from '@/app/loadingx';

const AppWrapper = ({ children, appStore, dbCart }: any) => {
    const store_id = numberParser(appStore?.id) || null;
    const dbCartObj = { dbCart, store_id } // as Record<'dbCart'  | 'store_id', any>;
    saveToLocalStorage(DB_CART_STATUS, dbCartObj);

    // useEffect(() => console.log('dbCart', dbCart),[dbCart]);

    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                // loading={<Loading design={design} />}
                persistor={persistor}
            >
                <VisitorLayer />
                {!appStore ? <NotFound /> : children}
                {dbCart && <EbitansCart />}
                <ToastContainer position="top-right" newestOnTop />
                <EbitansAnalytics store_id={store_id} />
            </PersistGate>
        </Provider>
    );
};
export default AppWrapper;

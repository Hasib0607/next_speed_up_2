'use client';

// import store form rtk
import store, { persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import StoreLayer from './StoreLayer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppWrapper = ({ children,design }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StoreLayer design={design}>{children}</StoreLayer>
                <ToastContainer position="top-right" newestOnTop />
            </PersistGate>
        </Provider>
    );
};
export default AppWrapper;
'use client';

// import store form rtk
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import StoreLayer from './StoreLayer';

const AppWrapper = ({ children, appStore }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StoreLayer appStore={appStore}>{children}</StoreLayer>
                <ToastContainer position="top-right" newestOnTop />
            </PersistGate>
        </Provider>
    );
};
export default AppWrapper;

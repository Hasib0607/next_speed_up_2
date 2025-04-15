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

// import Loading from '@/app/loadingx';

const AppWrapper = ({ children, appStore, design }: any) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                // loading={<Loading design={design} />}
                persistor={persistor}
            >
                <VisitorLayer />
                {!appStore ? <NotFound /> : children}
                <ToastContainer position="top-right" newestOnTop />
                <EbitansAnalytics design={design} />
            </PersistGate>
        </Provider>
    );
};
export default AppWrapper;

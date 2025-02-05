// components

import { ReactNode } from 'react';
import NotFound from './not-found';

interface StoreLayerProps {
    children: ReactNode;
    appStore: any;
}

const StoreLayer = ({ children, appStore }: StoreLayerProps) => {
    if (!appStore) return <NotFound />;
    return children
};

export default StoreLayer;

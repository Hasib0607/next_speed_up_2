import React, { ReactElement } from 'react';
import NotFound from './not-found';

interface StoreLayerProps {
    children: ReactElement | ReactElement[];
    appStore: any;
    design: any;
}

const StoreLayer = ({ children, design, appStore }: StoreLayerProps) => {
    if (!appStore) return <NotFound />;
    return children;
    // return (
    //     <>
    //         {React.Children.map(children, (child) =>
    //             React.isValidElement(child)
    //                 ? React.cloneElement(child as ReactElement, { design, appStore })
    //                 : child
    //         )}
    //     </>
    // );
};

export default StoreLayer;

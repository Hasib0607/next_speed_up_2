// components
import NotFound from './not-found';

const StoreLayer = ({ children, appStore }: any) => {
    return appStore ? <>{children}</> : <NotFound />;
};

export default StoreLayer;

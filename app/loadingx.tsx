import { DEFAULT } from '@/consts';
import { loaders } from '@/utils/dynamic-import/_loders/loaders';

const Loading = ({ design }: any) => {
    const LoadingSpinnerComponent =
        loaders[design?.preloader] || loaders[DEFAULT];

    return (
        LoadingSpinnerComponent && (
            <div className="center min-h-screen">
                <LoadingSpinnerComponent />
            </div>
        )
    );
};

export default Loading;

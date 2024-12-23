'use client';

import { DEFAULT } from '@/consts';
import { loaders } from '@/utils/dynamic-import/_loders/loaders';
import { useSelector } from 'react-redux';
// import getDesign from '@/utils/fetcher/getDesign';

const Loading = () => {
    // const design = await getDesign();
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    const LoadingSpinnerComponent =
        loaders[design?.preloader] || loaders[DEFAULT];

    return (
        <>
            {LoadingSpinnerComponent && (
                <div className="center min-h-screen">
                    <LoadingSpinnerComponent />
                </div>
            )}
        </>
    );
};

export default Loading;
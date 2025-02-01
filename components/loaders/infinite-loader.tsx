import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const InfiniteLoader = () => {
    return (
        <div className="flex justify-center items-center">
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#f1593a"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    );
};

export default InfiniteLoader;

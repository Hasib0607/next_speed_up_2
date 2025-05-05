import { classNames } from '@/helpers/littleSpicy';
import { ReactNode, FC } from 'react';

type SkeletonWrapperProps = {
    children: ReactNode;
    loadingStatus: boolean;
    className?: string;
};

const SkeletonWrapper: FC<SkeletonWrapperProps> = ({
    children,
    className,
    loadingStatus,
}) => {
    return (
        <>
            {!loadingStatus ? (
                <>{children}</>
            ) : (
                <>
                    <div
                        className={classNames(
                            'mt-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse',
                            className
                        )}
                    ></div>
                </>
            )}
        </>
    );
};

export default SkeletonWrapper;

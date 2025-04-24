import { classNames } from '@/helpers/littleSpicy';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ArrowSeventeenHero = ({
    nextEl,
    prevEl,
    className = 'absolute inset-0 flex items-center z-10',
}: any) => {
    const btnStyle =
        'lg:cursor-pointer bg-gray-500 hover:bg-black text-white transition-all duration-500 ease-linear absolute';

    const iconStyle =
        'h-8 text-2xl font-serif font-bold bg-[var(--header_color)] text-[var(--text_color)]';

    return (
        <div className={className}>
            <div className={classNames(prevEl, btnStyle, 'left-10')}>
                <ChevronLeftIcon className={iconStyle} />
            </div>
            <div className={classNames(nextEl, btnStyle, 'right-10')}>
                <ChevronRightIcon className={iconStyle} />
            </div>
        </div>
    );
};

export default ArrowSeventeenHero;

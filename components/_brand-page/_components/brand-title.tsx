import { classNames } from '@/helpers/littleSpicy';

const BrandTitle = ({ text, children, color }: any) => {
    return (
        <h3 className="font-semibold flex gap-1 text-black text-xl">
            <span
                className={
                    color
                        ? classNames(`text-${color}`)
                        : 'text-[var(--text-color)]'
                }
            >
                {text}
            </span>
            {children}
        </h3>
    );
};

export default BrandTitle;

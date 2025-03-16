const ShopBreadcrumb = ({ title, className, subTitle }: any) => {
    
    return (
        <div
            className={
                className ??
                'w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-10 mb-5'
            }
        >
            <h1 className="text-3xl font-medium ">{title ?? 'Product'}</h1>
            <div className="flex items-center gap-1">
                <p>Home</p>
                <p>/ {subTitle ?? 'Shop'}</p>
            </div>
        </div>
    );
};

export default ShopBreadcrumb;

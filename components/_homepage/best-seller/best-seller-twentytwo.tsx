import Card48 from '@/components/card/card48';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const BestSellerTwentyTwo = ({ product }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 sm:container px-5 sm:py-10 py-5">
            {product
                ?.slice(0, 4)
                ?.map((item: any) => (
                    <Card48 store_id={store_id} item={item} key={item?.id} />
                ))}
        </div>
    );
};

export default BestSellerTwentyTwo;

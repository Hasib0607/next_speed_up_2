import Link from 'next/link';
import Drawer from './drawer';
import BDT from '@/utils/bdt';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import ShoppingCart from '@/components/_shopping-cart/_components/shopping-cart';

export const CartSideBar = (props: any) => {
    const { design, setOpen } = props;
    const { cartList } = useSelector((state: RootState) => state.cart);
    const total = subTotal(cartList);

    return (
        <Drawer {...props}>
            <ShoppingCart {...props}>
                {props.children ?? (
                    <div className="w-full flex justify-center  bottom-0 right-0">
                        <Link
                            onClick={() => setOpen(false)}
                            href="/checkout"
                            className="w-full flex justify-between items-center py-4 divide-x-2 my-3 mx-6 px-6 rounded-md"
                            style={{
                                color: design?.text_color,
                                backgroundColor: design?.header_color,
                            }}
                        >
                            <p className="sm:text-base text-sm font-bold ">
                                {design?.template_id === '29'
                                    ? 'অর্ডার করুন'
                                    : 'Checkout'}
                            </p>{' '}
                            <p className="pl-4 sm:text-base text-sm">
                                {total} <BDT />
                            </p>
                        </Link>
                    </div>
                )}
            </ShoppingCart>
        </Drawer>
    );
};

import Drawer from './drawer';
import ShoppingCart from '@/components/_shopping-cart/_components/shopping-cart';

export const CartSideBar = (props: any) => {
    return (
        <Drawer {...props}>
            <ShoppingCart {...props}>{props.children}</ShoppingCart>
        </Drawer>
    );
};

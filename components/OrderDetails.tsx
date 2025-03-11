import OrderDetailsSeven from '@/components/_order-details-page/seven/order-details-seven';

const OrderDetails = ({ appStore, order_id }: any) => {
    return <OrderDetailsSeven appStore={appStore} order_id={order_id} />;
};

export default OrderDetails;

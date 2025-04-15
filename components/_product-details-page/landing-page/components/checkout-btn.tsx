'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CheckoutBtn = ({
    setQty,
    variantId,
    productQuantity,
    onClick,
    buttonStyle,
    productButton,
}: any) => {
    const router = useRouter();

    const handleCheckout = async () => {
        const success = await onClick(); 
        if (success) {
            router.push('/checkout');
        }
    };

    useEffect(() => {
        if (variantId) {
            setQty(1);
        }
    }, [variantId, setQty]);

    return (
        <div className="">
            <div className="flex justify-center items-center gap-x-10 pb-6">
                <div className="flex flex-wrap gap-6">
                    <div className="">
                        {productQuantity === 0 ? (
                            <button className={buttonStyle}>Out of Stock</button>
                        ) : (
                            <>
                                <button
                                    className="px-6 py-3"
                                    style={{
                                        backgroundColor:
                                            productButton?.design?.bg_color ||
                                            '#ffffff',
                                        color:
                                            productButton?.design?.color ||
                                            '#f1593a',
                                        border: `2px solid ${productButton?.design?.color || '#f1593a'}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            productButton?.design
                                                ?.hover_color || '#f1593a';
                                        e.currentTarget.style.color =
                                            productButton?.design?.bg_color ||
                                            '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            productButton?.design?.bg_color ||
                                            '#ffffff';
                                        e.currentTarget.style.color =
                                            productButton?.design?.color ||
                                            '#f1593a';
                                    }}
                                    onClick={handleCheckout}
                                >
                                    {productButton?.button}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutBtn;

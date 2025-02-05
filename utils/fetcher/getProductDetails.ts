import { notFound } from 'next/navigation';

export default async function getProductDetails({ store_id, productId }: any) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}product-details/${store_id}/${productId}`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            notFound();
        }

        // Clone the response if needed elsewhere
        const clonedResponse = response.clone();
        const clonedResponseData = await clonedResponse.json();

        // const resData = await response.json();
        const productDetails = clonedResponseData?.data;

        return productDetails;
    } catch (error) {
        console.error('Fetch get-product-details data error:', error);
        return null;
    }
}

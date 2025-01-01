import { redirect } from "next/navigation";


export default async function getProductDetails({ store_id, productId }: any) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}product-details/${store_id}/${productId}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );
    const resData = await res.json();
    const productDetails = resData?.data;

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        redirect('/not-found')
    }

    return productDetails;
}

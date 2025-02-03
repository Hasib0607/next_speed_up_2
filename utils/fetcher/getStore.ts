import getDomain from '@/helpers/getDomain';
import { notFound } from 'next/navigation';

export default async function getStore() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}/info`,
        {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ name: name }),
            next: {
                revalidate: 60,
            },
        }
    );

    const resData = await res.json();
    const storeDetails = resData?.data;

    if (!res.ok) {
        notFound();
    }

    return storeDetails;
}

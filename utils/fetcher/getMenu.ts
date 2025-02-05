import getDomain from '@/helpers/getDomain';
import { notFound } from 'next/navigation';

export default async function getMenu() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/menu`,
        {
            next: {
                revalidate: 10,
            },
        }
    );

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        notFound();
    }

    const resData = await res.json();
    const menu = resData?.data;
    
    return menu;
}

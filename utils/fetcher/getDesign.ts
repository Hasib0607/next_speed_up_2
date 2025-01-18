import getDomain from '@/helpers/getDomain';
import { redirect } from 'next/navigation';

export default async function getDesign() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/design`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    const resData = await res.json();
    const designDetails = resData?.data;

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        redirect('/not-found')
    }

    return designDetails;
}

import getDomain from '@/helpers/getDomain';

// export default async function getStore() {
//     const name = await getDomain();
//     // const name = 'etcjewelryshop.com';

//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}`,
//         {
//             next: {
//                 revalidate: 60,
//             },
//         }
//     );

//     const resData = await res.json();
//     const storeDetails = resData?.data;

//     if (!res.ok) {
//         // throw new Error('Failed to fetch data!');
//         notFound();
//     }

//     return storeDetails;
// }

export default async function getStore() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
            next: {
                revalidate: 60,
            },
        }
    );

    const resData = await res.json();
    const storeDetails = resData?.data;
    console.log('server log', res);
    console.log('server resData', resData);
    console.log('server storeDetails', storeDetails);

    if (!res.ok) {
        console.log('res.ok', res.ok);
        console.log('!res.ok', !res.ok);

        // notFound();
    }

    return storeDetails;
}

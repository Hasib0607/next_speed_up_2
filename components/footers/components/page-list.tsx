import Link from 'next/link';
import React from 'react';

const PageList = ({ cls, page }: any) => {
    return (
        page?.length > 0 &&
        page?.map((m: any) => (
            <Link href={'/' + m?.link} key={m?.id}>
                <p className={cls}>{m?.name}</p>
            </Link>
        ))
    );
};

export default PageList;

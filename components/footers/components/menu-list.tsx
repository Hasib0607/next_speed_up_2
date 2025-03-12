import Link from 'next/link';
import React from 'react';

const MenuList = ({ cls, menu }: any) => {
    return (
        menu?.length > 0 &&
        menu?.map(
            (m: any) =>
                m?.name !== 'Category' && (
                    <Link
                        href={m?.custom_link || (m?.url ? `/${m?.url}` : '/')}
                        key={m?.id}
                    >
                        <p className={cls}>{m?.name}</p>
                    </Link>
                )
        )
    );
};

export default MenuList;

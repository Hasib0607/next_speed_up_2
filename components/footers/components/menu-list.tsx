import Link from 'next/link';
import React from 'react';

const MenuList = ({ cls, menu, page }: any) => {
    const result = page.filter(
        (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
    );
    return (
        <>
            {menu?.map((m: any) =>
                m?.name !== 'Category' ? (
                    <Link key={m?.id} href={'/' + m?.url} className={cls}>
                        <p>{m?.name}</p>
                    </Link>
                ) : null
            )}
            {result?.map((m: any) => (
                <Link key={m?.id} href={'/' + m?.link} className={cls}>
                    <p>{m?.name}</p>
                </Link>
            ))}
        </>
    );
};

export default MenuList;

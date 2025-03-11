<<<<<<< HEAD
import Link from "next/link";
import React from "react";

const PageList = ({ cls, menu, page }: any) => {
  return (
    <>
      {page?.map((m: any) => (
        <p key={m?.id}>
          <Link href={"/" + m?.link} className={cls}>
            {m?.name}
          </Link>
        </p>
      ))}
    </>
  );
};

export default PageList;
=======
import Link from 'next/link';
import React from 'react';

const PageList = ({ cls, page }: any) => {
    return page?.map((m: any) => (
        <p key={m?.id}>
            <Link href={'/' + m?.link} className={cls}>
                {m?.name}
            </Link>
        </p>
    ));
};

export default PageList;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

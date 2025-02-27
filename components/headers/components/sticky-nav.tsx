import Link from "next/link";

const StickyNav = ({ menu }:any) => {

  return (
    <div className="bg-gray-100 all-hover">
      <div className="hidden lg:flex gap-8 items-center py-4 sm:container px-5 hover:opacity-100 font-twelve  font-medium uppercase">
        {menu?.map((menu: any) => (
          <ul key={menu?.id}>
            <Link href={menu?.url}>
              <li className="hover:scale-105">{menu?.name}</li>
            </Link>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default StickyNav;

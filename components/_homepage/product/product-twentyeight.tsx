'use client';

import { Category } from '@/types';
import { useRouter } from 'next/navigation';
import CatProductsList from './components/cat-products-list';

const ProductTwentyEight = ({ category, design }: any) => {
    const router = useRouter();

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
        .active-cat-twenty-four {
            color: ${bgColor};
            border-bottom: 2px solid ${bgColor};
        }
        .sec-twenty-nine {
            border-bottom: 2px solid ${bgColor};
        }
    `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>

            <div className="my-5 w-full relative flex flex-col lg2:flex-row justify-between lg2:items-center">
                <div className="flex flex-wrap gap-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 justify-center pt-10">
                    {category?.map((cat: Category) => (
                        <div key={cat.id} className="mb-8 w-full">
                            {cat?.total_products > 0 && (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="py-5 md:py-10 font-semibold text-lg">
                                            {cat.name}
                                        </h2>
                                    </div>
                                    <div>
                                        <button
                                            style={{
                                                backgroundColor: bgColor,
                                                color: textColor,
                                            }}
                                            className="text-white px-4 py-2 rounded transition duration-300 hover:bg-opacity-75"
                                            onClick={() =>
                                                router.push(
                                                    `/category/${cat?.id}`
                                                )
                                            }
                                        >
                                            Load More
                                        </button>
                                    </div>
                                </div>
                            )}
                            <CatProductsList
                                id={cat?.id}
                                card={'58'}
                                count={6}
                                btnType={'product'}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
            </div>
        </div>
    );
};

export default ProductTwentyEight;

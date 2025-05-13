import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import React, { useEffect, useState } from 'react';

const CategoryBreadcrumb45 = ({ catId, className, nameOnly }: any) => {
    const [activecat, setActivecat] = useState(false);
    const { data: categoryData } = useGetCategoryQuery({});

    useEffect(() => {
        const category = categoryData?.data || [];
        for (let i = 0; i < category.length; i++) {
            if (category[i]?.subcategories) {
                for (let j = 0; j < category[i].subcategories.length; j++) {
                    if (category[i]?.subcategories[j]?.id == catId) {
                        setActivecat(category[i]?.subcategories[j]?.name);
                    }
                }
            }

            if (category[i]?.id == catId) {
                setActivecat(category[i].name);
            }
        }
    }, [categoryData, catId]);

    if (nameOnly) {
        return <p className={className}>{activecat}</p>;
    }

    return (
        <div className="w-full bg-[var(--header-color)] text-[var(--text-color)] py-10 mb-5">
            <div className="flex justify-center text-3xl">
                <p>{activecat}</p>
            </div>
        </div>
    );
};

export default CategoryBreadcrumb45;

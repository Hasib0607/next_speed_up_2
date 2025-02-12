import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import React, { useEffect, useState } from 'react';

const CategoryBreadcrumb = ({ catId, className, nameOnly }: any) => {
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
        <div className="w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-5 mb-5">
            <h1 className="text-3xl font-medium ">Product</h1>
            <div className="flex items-center gap-1">
                <p>Home</p>
                <p>/</p>
                <p>{activecat}</p>
            </div>
        </div>
    );
};

export default CategoryBreadcrumb;

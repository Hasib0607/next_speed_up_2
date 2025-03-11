import { DEFAULT } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import { categories } from '@/utils/dynamic-import/categories/categories';

const Category = ({ design, catId }: any) => {
    const store_id = numberParser(design?.store_id) || null;

    const CategoryComponent =
        categories[design?.shop_page] || categories[DEFAULT];

    return (
        design?.shop_page !== 'null' &&
        CategoryComponent && (
            <CategoryComponent
                catId={catId}
                design={design}
                store_id={store_id}
            />
        )
    );
};

export default Category;

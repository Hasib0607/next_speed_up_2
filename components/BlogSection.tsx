import { DEFAULT } from '@/consts';
import { blog_sections } from '@/utils/dynamic-import/_homepageSections/blogSections/blogSections';

const BlogSection = ({ design }: any) => {
    const store_id = design?.store_id || null;

    const BlogSectionComponent =
        blog_sections[design?.blog] || blog_sections[DEFAULT];

    return (
        design?.blog !== 'null' &&
        BlogSectionComponent && <BlogSectionComponent design={design} />
    );
};

export default BlogSection;

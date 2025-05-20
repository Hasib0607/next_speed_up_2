import { DEFAULT } from '@/consts';
import { blog_sections } from '@/utils/dynamic-import/_homepageSections/blogSections/blogSections';
import { Suspense } from 'react';

const BlogSection = ({ design }: any) => {
    const BlogSectionComponent =
        blog_sections[design?.blog] || blog_sections[DEFAULT];

    return (
        <Suspense fallback={<p>Loading blog...</p>}>
            {design?.blog !== 'null' && BlogSectionComponent && (
                <BlogSectionComponent design={design} />
            )}
        </Suspense>
    );
};

export default BlogSection;

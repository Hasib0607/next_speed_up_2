'use client';

import Card47 from '../../card/card47';
import SectionHeadingTwentyThree from '../../section-heading/section-heading-twentythree';

const NewArrivalProductTwentyThree = ({
    product,
    design,
    headersetting,
}: any) => {
    const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="">
                <div>
                    <SectionHeadingTwentyThree
                        title={title}
                        title_color={title_color || '#000'}
                        design={design}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {product?.length > 0 &&
                    product?.slice(0, 8)?.map((item: any) => (
                        <div key={item.id}>
                            {' '}
                            <Card47 item={item} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NewArrivalProductTwentyThree;

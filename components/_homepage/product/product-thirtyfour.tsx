import Card60 from '@/components/card/card60';
import SectionHeadingThirtyFour from '@/components/section-heading/section-heading-thirtyfour';

const ProductThirtyFour = ({ product, design, headersetting }: any) => {
    const styleCss = `
    .new-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .new-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .new-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
    `;

    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="bg-[#F9F8FF]">
            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="relative arrow-hov">
                    <div className="text-center mb-5">
                        <SectionHeadingThirtyFour
                            title={title || 'Just For You'}
                            title_color={title_color || '#00'}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 sm:gap-5">
                        {product?.length > 0 &&
                            product
                                ?.slice(0, 10)
                                ?.map((item: any) => (
                                    <Card60 item={item} key={item.id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductThirtyFour;

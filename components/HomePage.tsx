import dynamic from 'next/dynamic';
const RenderSection = dynamic(
    () => import('@/components/_homepage/render-section')
);

const HomePage = ({ design, headersetting, banner, layout, slider }: any) => {
    return (
        <>
            {layout.length > 0 &&
                layout.map((componentType: string, index: number) => {
                    return (
                        <RenderSection
                            key={index}
                            component={componentType}
                            design={design}
                            headersetting={headersetting}
                            slider={slider}
                            banner={banner}
                        />
                    );
                })}
        </>
    );
};

export default HomePage;

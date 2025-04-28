import { bannerImg } from '@/site-settings/siteUrl';

const PromoBottomNineteen = ({ banner }: any) => {
    return (
        banner?.length > 0 &&
        banner?.map((item: any) => (
            <div key={item?.id} className="relative group">
                <img
                    className="max-h-[430px] min-w-[100%] object-cover"
                    src={bannerImg + item?.image}
                    alt=""
                />
            </div>
        ))
    );
};

export default PromoBottomNineteen;

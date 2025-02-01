import { mobile_navs } from '@/utils/dynamic-import/mobileNavs/mobileNavs';

const MobileBottomMenu = ({ design }: any) => {
    const MobileNavComponent = mobile_navs[design?.mobile_bottom_menu];

    return <>{design?.mobile_bottom_menu !== "null" && MobileNavComponent && <MobileNavComponent design={design} />}</>;
};

export default MobileBottomMenu;

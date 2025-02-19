import { mobile_navs } from '@/utils/dynamic-import/mobileNavs/mobileNavs';
import getDesign from '@/utils/fetcher/getDesign';

export default async function MobileBottomMenu() {
    const design = await getDesign();
    const MobileNavComponent = mobile_navs[design?.mobile_bottom_menu];

    return (
        design?.mobile_bottom_menu !== 'null' &&
        MobileNavComponent && <MobileNavComponent design={design} />
    );
}

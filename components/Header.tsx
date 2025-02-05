
import { headers } from '@/utils/dynamic-import/_homepageSections/header/header';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getMenu from '@/utils/fetcher/getMenu';

export default async function Header(){
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const menu = await getMenu();

    const HeaderComponent = headers[design?.header];

    return (
        <>
            {design?.header !== 'null' && HeaderComponent && (
                <HeaderComponent
                    design={design}
                    headersetting={headersetting}
                    menu={menu}
                />
            )}
        </>
    );
}


import { headers } from '@/utils/dynamic-import/header/header';

export default async function Header(props: any) {
    const HeaderComponent = headers[props?.design?.header];

    return (
        props?.design?.header !== 'null' &&
        HeaderComponent && <HeaderComponent {...props} />
    );
}
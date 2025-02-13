import HeaderTop from './header-top';
import HeaderDown from './header-down';

const HeaderThirteen = ({ headersetting, design, menu }: any) => {
    return (
        <>
            <HeaderTop headersetting={headersetting} design={design} />
            <HeaderDown menu={menu} headersetting={headersetting} />
        </>
    );
};

export default HeaderThirteen;

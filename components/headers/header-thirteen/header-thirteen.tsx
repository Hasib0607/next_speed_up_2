import HeaderDown from './header-down';
import HeaderTop from './header-top';

const HeaderThirteen = ({ headersetting, design, menu }: any) => {
    return (
        <div>
            <HeaderTop headersetting={headersetting} design={design} />
            <HeaderDown menu={menu} headersetting={headersetting} />
        </div>
    );
};

export default HeaderThirteen;

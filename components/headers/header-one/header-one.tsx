import HeaderDown from './header-down';
import HeaderMid from './header-mid';
import HeaderTop from './header-top';

const HeaderOne = ({ headersetting, menu, design }: any) => {
    return (
        <div className="flex flex-col gap-1">
            <HeaderTop headersetting={headersetting} design={design} />
            <HeaderDown headersetting={headersetting} />
            <HeaderMid
                menu={menu}
                headersetting={headersetting}
                design={design}
            />
        </div>
    );
};

export default HeaderOne;

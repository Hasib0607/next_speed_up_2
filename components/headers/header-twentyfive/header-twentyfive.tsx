import HeaderDown from './header-down';
import HeaderTop from './header-top';

const HeaderTwentyFive = ({ design, menu, headersetting }: any) => {
    return (
        <div className="sticky top-0 left-0 right-0 z-10">
            <HeaderTop headersetting={headersetting} design={design} />
            <HeaderDown
                menu={menu}
                headersetting={headersetting}
                design={design}
            />
        </div>
    );
};

export default HeaderTwentyFive;

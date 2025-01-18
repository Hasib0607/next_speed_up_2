import HomePage from '@/components/Home';
import getDesign from '@/utils/fetcher/getDesign';

export default async function Home() {
    const design = await getDesign();
    
    return (
        <>
            <HomePage design={design} />
            {/* <AllMobileBottomMenu/> */}
            {/* <HomepageLoad /> */}
            {/* <MobileNavThree/> */}
        </>
    );
}

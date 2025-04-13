import Card4 from '@/components/card/card4';
import Card6 from '@/components/card/card6';
import Card7 from '@/components/card/card7';
import Card15 from '@/components/card/card15';
import Card16 from '@/components/card/card16';
import Card17 from '@/components/card/card17';
import Card29 from '@/components/card/card29';
import Card45 from '@/components/card/card45';
import Card49 from '@/components/card/card49';
import Card51 from '@/components/card/card51';
import Card53 from '@/components/card/card53';
import Card54 from '@/components/card/card54';
import Card56 from '@/components/card/card56';
import Card58 from '@/components/card/card58';
import Card63 from '@/components/card/card63';
import Card65 from '@/components/card/card65';
import Card67 from '@/components/card/card67';
import ProductCardTen from '@/components/card/product-card/product-card-ten';
import Card74 from '@/components/card/card74';

const Cards = ({ card, item, btnType }: any) => {
    switch (card) {
        case '4':
            return <Card4 item={item} type={btnType} />;
        case '6':
            return <Card6 item={item} type={btnType} />;
        case '7':
            return <Card7 item={item} type={btnType} />;
        case '15':
            return <Card15 item={item} type={btnType} />;
        case '16':
            return <Card16 item={item} type={btnType} />;
        case '17':
            return <Card17 item={item} type={btnType} />;
        case '29':
            return <Card29 item={item} type={btnType} />;
        case '45':
            return <Card45 item={item} type={btnType} />;
        case '49':
            return <Card49 item={item} type={btnType} />;
        case '51':
            return <Card51 item={item} type={btnType} />;
        case '53':
            return <Card53 item={item} type={btnType} />;
        case '54':
            return <Card54 item={item} type={btnType} />;
        case '56':
            return <Card56 item={item} type={btnType} />;
        case '58':
            return <Card58 item={item} type={btnType} />;
        case '63':
            return <Card63 item={item} type={btnType} />;
        case '65':
            return <Card65 item={item} type={btnType} />;
        case '67':
            return <Card67 item={item} type={btnType} />;
        case '74':
            return <Card74 item={item} type={btnType} />;
        case 'ProductCardTen':
            return <ProductCardTen item={item} />;
        default:
            return <Card58 item={item} type={btnType} />;
    }
};

export default Cards;

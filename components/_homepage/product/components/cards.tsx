import Card16 from "@/components/card/card16";
import Card29 from '@/components/card/card29';
import Card45 from '@/components/card/card45';
import Card49 from '@/components/card/card49';
import Card51 from '@/components/card/card51';
import Card53 from '@/components/card/card53';
import Card54 from "@/components/card/card54";
import Card56 from "@/components/card/card56";
import Card58 from '@/components/card/card58';
import Card65 from "@/components/card/card65";
import Card67 from "@/components/card/card67";

const Cards = ({ card, item }: any) => {
    switch (card) {
        case '16':
            return <Card16 item={item} />;
        case '29':
            return <Card29 item={item} />;
        case '45':
            return <Card45 item={item} />;
        case '49':
            return <Card49 item={item} />;
        case '51':
            return <Card51 item={item} />;
        case '53':
            return <Card53 item={item} />;
        case '54':
            return <Card54 item={item} />;
        case '56':
            return <Card56 item={item} />;
        case '58':
            return <Card58 item={item} />;
        case '65':
            return <Card65 item={item} />;
        case '67':
            return <Card67 item={item} />;
        default:
            return <Card58 item={item} />;
    }
};

export default Cards;

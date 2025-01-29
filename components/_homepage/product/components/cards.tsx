import Card16 from "@/components/card/card16";
import Card53 from '@/components/card/card53';
import Card54 from "@/components/card/card54";
import Card58 from '@/components/card/card58';
import Card65 from "@/components/card/card65";
import Card67 from "@/components/card/card67";

const Cards = ({ card, item }: any) => {
    switch (card) {
        case '16':
            return <Card16 item={item} />;
        case '53':
            return <Card53 item={item} />;
        case '54':
            return <Card54 item={item} />;
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

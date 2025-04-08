import { numberParser } from './numberParser';

export default function getPaginationStatusById(
    modules: any,
    module_id: number
) {
    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );

    return numberParser(paginationModule?.status) === 1;
}

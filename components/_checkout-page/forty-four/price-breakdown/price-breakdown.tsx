'use client';

import { useAppSelector } from '@/redux/features/rtkHooks/rtkHooks';
import { RootState } from '@/redux/store';
import BDT from '@/utils/bdt';

const PriceBreakdown = ({ total, gTotal }: any) => {
    const { shippingAreaCost } = useAppSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    return (
        <div className={'col-span-6 sm:col-span-4'}>
            <div className="center flex-col">
                <div className="center flex-col gap-2">
                    <p className="text-md font-normal">
                        Your total payable amount is
                    </p>
                    <p className="text-3xl font-semibold space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{gTotal}</span>
                    </p>
                    <p className="text-xl font-semibold">Breakdown</p>
                </div>
                <div className="max-w-132 w-full overflow-x-auto px-2 md:px-0">
                    <table className="w-full border border-gray-500 rounded-lg">
                        <thead className="border">
                            <tr>
                                <th className="border px-4 py-2">Purpose</th>
                                <th className="border px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr className="border">
                                <td className="border px-4 py-2">Total</td>
                                <td className="border px-4 py-2 text-green-500">
                                    <p className="space-x-1 text-green-500">
                                        <span>
                                            <BDT />
                                        </span>
                                        <span>{total}</span>
                                    </p>
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="border px-4 py-2">Shipping</td>
                                <td className="border px-4 py-2 text-green-500">
                                    <p className="space-x-1">
                                        <span>
                                            <BDT />
                                        </span>
                                        <span>{shippingAreaCost ?? 0}</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="py-2">
                    You will get the delivery{' '}
                    <span className="text-green-500 font-semibold">
                        within 2-3 Days
                    </span>{' '}
                    after confirmation.
                </p>
            </div>
        </div>
    );
};

export default PriceBreakdown;

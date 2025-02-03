'use client';

import { profileImg } from '@/site-settings/siteUrl';
import moment from 'moment';
import Rate from '@/utils/rate';
import { useState } from 'react';
import { HTML_TAG_PATTERN } from '@/consts';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { numberParser } from '@/helpers/numberParser';
import { AnimatePresence, motion } from 'framer-motion';

const According = ({ text, description }: any) => {
    const [show, setShow] = useState(false);
    const isDescription = HTML_TAG_PATTERN.test(description);
    let reviewsArr = description?.data || [];

    return (
        <AnimatePresence>
            <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold mb-3"
            >
                <div className="h3 font-seven">{text}</div>
                {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
            </div>
            {show && (
                <>
                    {isDescription && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="font-seven"
                            >
                                <DangerouslySafeHTML content={description} />
                            </motion.div>
                        </>
                    )}
                    {!isDescription && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="font-seven"
                            >
                                {description?.status && reviewsArr.length > 0
                                    ? reviewsArr?.map((item: any) => (
                                          <UserReview
                                              review={item}
                                              key={item.id}
                                          />
                                      ))
                                    : description?.message}
                            </motion.div>
                        </>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default According;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);
    const parsedDate = moment(new Date(review?.cd)).format('DD/MM/YYYY');

    return (
        <div className=" bg-slate-50 p-5">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={profileImg + review?.image}
                        className="rounded-full h-full w-full"
                        alt=""
                    />
                </div>
            </div>
            <Rate className="text-base" rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">{parsedDate}</p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

'use client';

import ProtectedLayer from '@/app/ProtectedLayer';
import LeftSide from '@/components/dashboard/left-side';

import React, { PropsWithChildren } from 'react';

const ProfileLayout = ({ children }: PropsWithChildren) => {
    return (
        <ProtectedLayer>
            <div className="sm:container px-5 pt-8">
                <div className="md:grid md:grid-cols-3 md:gap-6 pt-3 pb-6">
                    <LeftSide />
                    <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
                </div>
            </div>
        </ProtectedLayer>
    );
};

export default ProfileLayout;

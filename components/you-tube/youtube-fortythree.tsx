'use client';

import React, { useState } from 'react';
import { getEmbedYoutubeUrl } from './components/getEmbedYoutubeUrl';
import { PlayIcon } from '@heroicons/react/24/solid';
import { brandImg } from '@/site-settings/siteUrl';

const YoutubeFortyThree = ({ headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const youtubeData = custom_design?.youtube || {};
    const youtubeLink = youtubeData?.[0]?.link;

    const backgroundImage =
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e';
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const embedUrl = youtubeLink ? getEmbedYoutubeUrl(youtubeLink) : null;

    const brandData = custom_design?.brand || {};



    return (
        <>
            <div className="relative min-h-screen w-full overflow-hidden">
                {/* Full-screen Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: `url(${backgroundImage || ''})` }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                    {embedUrl ? (
                        <div className="w-full max-w-6xl">
                            {!isVideoPlaying ? (
                                // Preview Overlay
                                <div className="text-center space-y-8">
                                    <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                        {youtubeData?.[0]?.title ||
                                            'Watch Our Story'}
                                    </h2>
                                    {youtubeData?.[0]?.subtitle && (
                                        <p className="text-lg text-gray-200 mt-4 md:text-xl">
                                            {youtubeData?.[0]?.subtitle}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => setIsVideoPlaying(true)}
                                        className="inline-flex items-center justify-center rounded-full bg-red-600 p-5 hover:bg-red-700 transition-all duration-300 hover:scale-110"
                                        aria-label="Play video"
                                    >
                                        <PlayIcon className="h-16 w-16 text-white" />
                                    </button>
                                </div>
                            ) : (
                                // Video Container
                                <div className="mx-auto max-w-3xl relative aspect-video bg-black/80 rounded-lg overflow-hidden shadow-2xl">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={`${embedUrl}?autoplay=1`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        // Fallback Content
                        <div className="text-center p-8 bg-black/30 rounded-lg">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                {youtubeData?.[0]?.title || 'Featured Content'}
                            </h2>
                            <p className="text-gray-200">
                                {youtubeData?.[0]?.subtitle ||
                                    'No video available'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Brand Start */}
            <div className="relative h-screen w-full">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            `url(${backgroundImage || ''})`,
                        backgroundAttachment: 'fixed',
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex h-full items-center justify-start md:justify-end pr-0 md:pr-80 text-start">
                    <div className="max-w-2xl px-4 md:px-8">
                        <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Welcome to Our Platform
                        </h1>
                        <p className="text-lg text-gray-200 md:text-xl mb-6">
                            Discover amazing experiences and create
                            unforgettable memories with our premium services
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 py-5">
                            <div className="text-white flex items-center gap-3 my-3">
                                <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden group">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                                        alt=""
                                    />
                                    {/* <Image
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                                        alt=""
                                        width={500}
                                        height={500}
                                    /> */}

                                    <div className="absolute inset-0 bg-gray-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out opacity-50"></div>
                                </div>
                                <h3>Stitched leather straps</h3>
                            </div>
                            <div className="text-white flex items-center gap-3 my-3">
                                <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden group">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                                        alt=""
                                    />

                                    <div className="absolute inset-0 bg-gray-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out opacity-50"></div>
                                </div>
                                <h3>Stitched leather straps</h3>
                            </div>
                            <div className="text-white flex items-center gap-3 my-3">
                                <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden group">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                                        alt=""
                                    />

                                    <div className="absolute inset-0 bg-gray-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out opacity-50"></div>
                                </div>
                                <h3>Stitched leather straps</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YoutubeFortyThree;

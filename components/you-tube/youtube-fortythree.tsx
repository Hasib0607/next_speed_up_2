'use client';

import React, { useState } from 'react';
import { getEmbedYoutubeUrl } from './components/getEmbedYoutubeUrl';
import { PlayIcon } from '@heroicons/react/24/solid';
import { youtubeBgImg } from '@/site-settings/siteUrl';
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/outline';

const YoutubeFortyThree = ({ headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const youtubeData = custom_design?.youtube || {};
    const youtubeLink = youtubeData?.[0]?.link;

    const embedUrl = youtubeLink ? getEmbedYoutubeUrl(youtubeLink) : null;

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <>
            <div className="relative min-h-screen w-full overflow-hidden">
                {/* Full-screen Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: `url(${youtubeBgImg + youtubeData?.[0]?.bg_image || ''})`,
                    }}
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
                                    <button
                                        onClick={() => setIsVideoPlaying(false)}
                                        className="absolute top-0 right-0 z-20 p-2 text-white bg-gray-800/80 hover:bg-gray-700/90 rounded-full transition-colors"
                                        aria-label="Close video"
                                    >
                                        <CloseIcon className="h-5 w-5" />
                                    </button>
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
        </>
    );
};

export default YoutubeFortyThree;

import React from 'react';
import { getEmbedYoutubeUrl } from './components/getEmbedYoutubeUrl';



const YoutubeFortyThree = ({ headersetting }: any) => {
  const { custom_design } = headersetting || {};
  const youtubeData = custom_design?.youtube || {};
  const youtubeLink = youtubeData?.[0]?.link;
  
  const embedUrl = youtubeLink ? getEmbedYoutubeUrl(youtubeLink) : null;

  return (
    <div className="flex items-center justify-center w-full min-h-[315px] py-8">
    {embedUrl ? (
      <div className="w-full lg:px-0 relative">
        {/* Aspect ratio box with max-width for smaller screens */}
        <div className="mx-auto max-w-4xl lg:max-w-none">
          <div className="aspect-video relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; 
                     autoplay; 
                     clipboard-write; 
                     encrypted-media; 
                     gyroscope; 
                     picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-gray-500 text-lg">No video available</div>
    )}
  </div>
  );
};

export default YoutubeFortyThree;



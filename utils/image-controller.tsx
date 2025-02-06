import Image from "next/image";

const ImageController = ({
    divClass,
    addClass,
    src,
    width,
    height,
    alt,
    backdrop
  }:any) => {
    return (
        <>
         {/* <div
          className={
            divClass != undefined && divClass != ""
              ? `${divClass}`
              : "relative rounded-lg h-80 overflow-hidden ring-1 ring-primary shadow-lg"
          }
        > */}
          <Image
            alt={alt != undefined && alt != "" ? `${alt}` : `no-content`}
            src={
              src != undefined && src != ""
                ? `${src}`
                : `https://www.dummyimage.com/1200x600`
            }
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G4vAgABqwEGEzLyIQAAAABJRU5ErkJggg=="
            quality={100}
            fill
            // width={width != undefined && width != "" ? `${width}` : 400}
            // height={height != undefined && height != "" ? `${height}` : 100}
            className={
              addClass != undefined && addClass != ""
                ? `${addClass}`
                : `object-cover object-center h-full w-full`
            }
          />
          {backdrop && <div className="absolute inset-0 blackout-1"></div>}
        {/* </div> */}
        </>
 
    );
  };

  export default ImageController
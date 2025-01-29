import Image from 'next/image';
import img1 from "../assets/img/ebitans/404.png";
import img2 from "../assets/img/ebitans/404robot.png";

export default function NotFound() {
    return (
        <div>
            <section className="bg-white">
                <div className="flex lg:flex-row flex-col justify-center items-center sm:container px-5 gap-10 lg:h-screen my-20 lg:my-0 w-full">
                    <div className="w-full flex flex-col justify-center items-center">
                        <Image width={500} height={500} src={img1.src} alt="404" />
                        <div className="md:text-[40px] text-2xl flex flex-col gap-2">
                            <p>Something went</p>
                            <p className="font-bold">
                                Wrong <span className="font-normal">or</span>{' '}
                                Incorrect{' '}
                            </p>
                            <p className="font-bold">URL</p>
                        </div>
                    </div>
                    <div className="w-full mx-auto">
                        <Image width={500} height={500} src={img2.src} alt="404robot" />
                    </div>
                </div>
            </section>
        </div>
    );
}

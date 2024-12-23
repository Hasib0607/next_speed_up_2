export default async function NotFound(){
    return (
        <div>
            <section className="bg-white">
                <div className="flex lg:flex-row flex-col justify-center items-center sm:container px-5 gap-10 lg:h-screen my-20 lg:my-0 w-full">
                    <div className="w-full flex flex-col justify-center items-center">
                        <img
                            className="h-auto"
                            src="./images/error/404.7d8224f054cd5cd2de58.png"
                            alt=""
                        />
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
                        <img
                            className="h-auto"
                            src="./images/error/404robot.76ba1338747113f764b3.png"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
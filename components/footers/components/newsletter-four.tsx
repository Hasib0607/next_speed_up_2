import { useSubscribeNewsletterMutation } from '@/redux/features/blog/blogApi';
import { useRef } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { toast } from 'react-toastify';

const NewsletterFour = ({ design, store_id }: any) => {
    const emailRef = useRef<any>(null);

    const [subscribeNewsletter] = useSubscribeNewsletterMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const email = emailRef.current.value;

        async function fetchData() {
            subscribeNewsletter({ store_id, email })
                .unwrap()
                .then((res: any) => {
                    if (res?.error) {
                        toast.success(
                            res?.error || 'Your email has already been taken'
                        );
                        emailRef.current.value = '';
                    } else {
                        toast.success(
                            res?.message ||
                                'Successfully Subscribe to Our Newsletter'
                        );
                        emailRef.current.value = '';
                    }
                })
                .catch((error: any) => {
                    toast.error(error?.status || 'Something went wrong');
                });
        }
        if (email) {
            fetchData();
        }
    };

    const styleCss = `

  .button-newsletter{
    background: ${design?.header_color};
    color: ${design?.text_color};
    border: 1px solid black;
}
    `;

    return (
        <div>
            <style>{styleCss}</style>
            <div className="flex flex-col gap-5 justify-center bg-gray-100 py-16 overflow-hidden items-center ">
                <div>
                    <h1 className="text-3xl font-bold">Sign up</h1>
                </div>
                <div className="text-center">
                    <form onSubmit={handleSubmit} className="flex  gap-2">
                        <input
                            ref={emailRef}
                            type="email"
                            className="w-full lg:w-[500px] border border-black focus:border-black py-3 opacity-100 outline-none focus:outline-none focus:ring-0 focus:ring-black text-black"
                            placeholder="Write your email here"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 md:py-2 py-1 hover:opacity-80 shadow-[3px_3px_1px_1px_black] hover:shadow-none duration-500 text-lg button-newsletter"
                        >
                            <AiOutlineArrowRight />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterFour;

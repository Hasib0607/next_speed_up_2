import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

 const SinglePassword = ({ label, register, registerName }: any) => {
    const [hide, setHide] = useState(false);

    return (
        <>
            <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    {...register(registerName)}
                    type={!hide ? 'password' : 'text'}
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-black p-2 bg-white hover:bg-gray-50 transition duration-300 ease-in-out"
                />

                {hide ? (
                    <EyeIcon
                        onClick={() => setHide(!hide)}
                        className="ab absolute right-2 top-2"
                        height={18}
                        width={18}
                    />
                ) : (
                    <EyeSlashIcon
                        onClick={() => setHide(!hide)}
                        className="ab absolute right-2 top-2"
                        height={18}
                        width={18}
                    />
                )}
            </div>
        </>
    );
};

export default SinglePassword
"use client";

import { ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface UnProtectedProps {
    children: ReactNode;
}

const GuestLayer: FC<UnProtectedProps> = ({ children }) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/profile");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null; // Prevent rendering until redirection
    }

    return <>{children}</>;
};  

export default GuestLayer;
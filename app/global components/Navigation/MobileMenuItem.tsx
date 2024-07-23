"use client";
import React from "react";
import Link from "next/link";
import { useSideBarContext } from "../../contexts/sideBarContext";
import { usePathname } from "next/navigation";

interface Props {
    page: string;
    icon: React.JSX.Element;
    text: string;
}

const MobileMenuItem = ({ page, icon, text }: Props) => {
    const pathname = usePathname();

    return (
        <div
            className={`rounded-md w-full my-10 ${pathname == page ? "bg-darkest-color text-disabled-color" : "hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300"}`}
        >
            <Link
                href={page}
                className={`relative px-3 py-3 flex items-center justify-between font-medium rounded-md cursor-pointer`}
            >
                <span className={``}>{text}</span>
                {icon}
            </Link>
        </div>
    );
};

export default MobileMenuItem;

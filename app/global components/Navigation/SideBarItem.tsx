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

const SideBarItem = ({ page, icon, text }: Props) => {
    const { expanded } = useSideBarContext();
    const pathname = usePathname();

    return (
        <div
            className={`rounded-md w-full my-2 ${pathname == page ? "bg-darkest-color text-disabled-color" : "hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300"}`}
        >
            <Link
                href={page}
                className={`relative px-3 py-3 flex items-center font-medium rounded-md cursor-pointer transition-colors group`}
            >
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-2`}
                    >
                        {text}
                    </div>
                )}
            </Link>
        </div>
    );
};

export default SideBarItem;

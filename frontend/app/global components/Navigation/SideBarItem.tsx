import React from "react";
import CustomLink from "../CustomLink";

interface Props {
    page: string;
    icon: React.JSX.Element;
    text: string;
    isActive: boolean;
    isExpanded: boolean;
}

const SideBarItem = ({ page, icon, text, isActive, isExpanded }: Props) => {

    return (
        <div
            className={`rounded-md w-full my-2 ${isActive ? "bg-darkest-color text-disabled-color" : "hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300"}`}
        >
            <CustomLink
                href={page}
                className={`relative px-3 py-3 flex items-center font-medium rounded-md cursor-pointer transition-colors group`}
            >
                {icon}
                <span className={`overflow-hidden transition-all ${isExpanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

                {!isExpanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-100 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-2`}
                    >
                        {text}
                    </div>
                )}
            </CustomLink>
        </div>
    );
};

export default SideBarItem;

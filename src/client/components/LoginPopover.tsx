import { Popover } from "@headlessui/react";
import CitiesCombobox from "./CitiesCombobox";
import Triangle from "../../images/triangle.svg";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function LoginPopover( {onClicked} ) {
    return (
        <Popover>
                <>
                    <Popover.Button className="w-22 flex justify-center lg:hidden border rounded-full bg-white mr-2 shadow-md">
                        <UserIcon className="w-10 h-10 py-1 pl-1 text-slate-600" />
                        <ChevronDownIcon className="w-10 h-10 py-1 pr-1 text-slate-500" />
                    </Popover.Button>
                    <Popover.Panel>
                        <Image src={Triangle} alt="" className={"absolute w-4 h-4 fill-white top-12 right-10"} />
                        <div className={"mt-3 flex flex-col font-mono absolute right-2 z-10 bg-white shadow-md rounded-sm"}>
                            <button onClick={() => onClicked()}className={"border-b-2 px-5 py-2 w-full text-left"}>Login or register</button>
                            <Link href="./help"><button className={"px-5 py-2 w-full text-left"}>Help</button></Link>
                        </div>
                    </Popover.Panel>
                </>
        </Popover>
    )
}

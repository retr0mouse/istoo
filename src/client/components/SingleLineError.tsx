import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export default function SingleLineError({ message }: { message: string }) {
    return (
        <div className=" px-2 py-1 rounded-md border-red-400 border-solid border-2 bg-red-200 flex justify-between ">
            <span className="font-mono font-normal text-xl ">{message}</span>
            <ExclamationTriangleIcon className="inline text-red-500 w-6"/>
        </div>
    );
}
import { ReactNode } from "react"

export const SearchBar = ({ imagesvg, placeholder }: { imagesvg?: ReactNode, placeholder: string }) => {
    return <form className="max-w-md mx-auto">
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {imagesvg}
            </div>
            <input
                type="search"
                className="block text-white bg-[#1f2a3d] rounded-full w-full p-2 ps-10 text-sm border border-gray-300"
                placeholder={placeholder}
            />
        </div>
    </form>
}
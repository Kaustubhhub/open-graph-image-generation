"use client"
import { ReactNode } from "react"

export const PrimaryButton = ({ children, imagesvg, onClick }: { children: ReactNode, imagesvg?: ReactNode, onClick: () => void }) => {
    return <button onClick={onClick} type="button" className="flex justify-between items-center text-white bg-[#705C99] hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full px-2 py-2 text-sm text-center">
       {imagesvg && <div className="px-2">
            {imagesvg}
        </div>}
        <span className={imagesvg?"pr-2" : "px-3"}> {children}</span>
    </button>
}
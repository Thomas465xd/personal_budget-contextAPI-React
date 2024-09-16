import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
    return (
        <p className="border-x-4 border-red-400 bg-red-100 p-2 text-red-400 font-bold text-sm text-center">
            {children}
        </p>
    )
}

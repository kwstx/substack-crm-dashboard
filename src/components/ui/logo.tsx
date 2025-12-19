import { cn } from "@/lib/utils";

export const Logo = ({ className, size = 32 }: { className?: string, size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-gray-900", className)}
    >
        <path
            d="M16 2L2 9L16 16L30 9L16 2Z"
            className="fill-current opacity-100"
        />
        <path
            d="M2 23L16 30L30 23"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
        />
        <path
            d="M2 16L16 23L30 16"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
        />
    </svg>
);

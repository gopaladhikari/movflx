import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export const cn = (...className: ClassValue[]) => twMerge(clsx(className));

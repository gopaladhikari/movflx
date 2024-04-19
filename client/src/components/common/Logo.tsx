import Image from "next/image";

export function Logo() {
	return (
		<Image
			src="/logo.png"
			alt="logo"
			width={140}
			height={110}
			className="my-auto mt-1 h-8 w-28 md:h-auto md:w-36"
		/>
	);
}

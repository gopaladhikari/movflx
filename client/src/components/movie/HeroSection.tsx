type Props = {
	children: React.ReactNode;
};

export function MoviepageHeroSection({ children }: Props) {
	return (
		<section
			style={{
				background:
					"linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/breadcrumb_bg.jpg) center center / cover no-repeat",
			}}
		>
			{children}
		</section>
	);
}

import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "@/config/env";

type Props = {
	children: React.ReactNode;
};

export default function GoogleOAuthProviderWrapper({ children }: Props) {
	return (
		<GoogleOAuthProvider clientId={env.googleClientId}>
			{children}
		</GoogleOAuthProvider>
	);
}

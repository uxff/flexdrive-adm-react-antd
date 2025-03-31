import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

// import { useUserToken } from "@/store/userStore";

import PageError from "@/pages/sys/error/PageError";
import { useRouter } from "../hooks";
import { useAdmApiToken } from "@/store/admuserStore";

type Props = {
	children: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
	const router = useRouter();
	// const { accessToken } = useUserToken();
	const admApiToken = useAdmApiToken();

	const check = useCallback(() => {
		if (!admApiToken) {
			router.replace("/login");
		}
	}, [router, admApiToken]);

	useEffect(() => {
		check();
	}, [check]);

	return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}

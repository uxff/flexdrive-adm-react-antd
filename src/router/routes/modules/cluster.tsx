import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import ToastPage from "@/pages/components/toast";
import type { AppRouteObject } from "#/router";

const AnimatePage = lazy(() => import("@/pages/components/animate"));
const ScrollPage = lazy(() => import("@/pages/components/scroll"));
const MarkdownPage = lazy(() => import("@/pages/components/markdown"));
const EditorPage = lazy(() => import("@/pages/components/editor"));
const MultiLanguagePage = lazy(
	() => import("@/pages/components/multi-language"),
);
const IconPage = lazy(() => import("@/pages/components/icon"));
const UploadPage = lazy(() => import("@/pages/components/upload"));
const ChartPage = lazy(() => import("@/pages/components/chart"));
const NodeManagement = lazy(() => import("@/pages/cluster/nodemanagement"));

const cluster: AppRouteObject = {
	order: 3,
	path: "cluster",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.cluster-management",
		icon: (
			<Iconify
				icon="solar:widget-5-bold-duotone"
				className="ant-menu-item-icon"
				size="24"
			/>
		),
		key: "/cluster",
	},
	children: [
		{
			index: true,
			element: <Navigate to="node-management" replace />,
		},
		{
			path: "node-management",
			element: <NodeManagement />,
			meta: { label: "sys.menu.node-management", key: "/cluster/node-management" },
		},
		{
			path: "animate",
			element: <AnimatePage />,
			meta: { label: "sys.menu.animate", key: "/components/animate" },
		},
		{
			path: "scroll",
			element: <ScrollPage />,
			meta: { label: "sys.menu.scroll", key: "/components/scroll" },
		},
	],
};

export default cluster;

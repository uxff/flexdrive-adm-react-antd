import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { t } from "@/locales/i18n";

import apiService, { type LoginReq, NodeListReq, NodeListRes } from "@/api/services/admuserService";

import { toast } from "sonner";
import type { MgrEntity } from "#/entity";
import { StorageEnum } from "#/enum";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type MgrInfoStore = {
	mgrInfo: Partial<MgrEntity>;
	admApiToken: string;
	// 使用 actions 命名空间来存放所有的 action
	actions: {
		setMgrInfo: (mgrInfo: MgrEntity) => void;
		setAdmApiToken: (token: string) => void;
		clearMgrInfoAndToken: () => void;
	};
};

const useMgrInfoStore = create<MgrInfoStore>()(
	persist(
		(set) => ({
			mgrInfo: {},
			admApiToken: "",
			actions: {
				setMgrInfo: (mgrInfo) => {
					set({ mgrInfo });
				},
				setAdmApiToken: (token) => {
					set({ admApiToken: token });
				},
				clearMgrInfoAndToken() {
					set({ mgrInfo: {}, admApiToken: "" });
				},
			},
		}),
		{
			name: "admMgrStore", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({
				[StorageEnum.AdmMgrInfo]: state.mgrInfo,
				[StorageEnum.AdmApiToken]: state.admApiToken,
			}),
		},
	),
);

// 外面其他模块判断是否登录，使用下面两个函数
export const useMgrInfo = () => useMgrInfoStore((state) => state.mgrInfo);
export const useAdmApiToken = () => useMgrInfoStore((state) => state.admApiToken);
export const useUserPermission = () =>
	useMgrInfoStore((state) => state.mgrInfo.permissions);
export const useMgrActions = () => useMgrInfoStore((state) => state.actions);

export const useLogin = () => {
	const navigatge = useNavigate();
	// const { setUserToken, setMgrInfo: setMgrInfo } = useMgrActions();
	const { setAdmApiToken, setMgrInfo } = useMgrInfoStore((state) => state.actions);//useMgrActions();

	const loginMutation = useMutation({
		mutationFn: apiService.login,
	});

	const login = async (data: LoginReq) => {
		try {
			const res = await loginMutation.mutateAsync(data);
			const { errcode, errmsg, result, LoginInfo } = res;
			// const {}
			console.log('will get res:', res);
			if (errcode != '0') {
				throw new Error(t("sys.api.apiRequestFailed")+':'+errmsg);
			}
			if (result['API-Token'] == null || result['API-Token'] == '') {
				throw new Error(t("sys.api.apiRequestFailed")+':'+'get API-Token failed. Try again.');
			}
			// setUserToken({ accessToken, refreshToken });
			// setMgrInfo(LoginInfo.MgrEnt)
			console.log('got token:'+result?.["API-Token"]);
			setAdmApiToken(result?.["API-Token"]);
			setMgrInfo(LoginInfo.MgrEnt);
			navigatge(HOMEPAGE, { replace: true });
			toast.success("Login success!");
		} catch (err) {
			toast.error(err.message, {
				position: "top-center",
			});
		}
	};

	return login;
};

export const nodeList = async <NodeListRes>(data: NodeListReq) => {
	try {
		const nodeListMutation = useMutation({
			mutationFn: () => {
				const apiToken :string = useAdmApiToken(); //useMgrInfoStore().admApiToken;
				return apiService.nodeList(data, apiToken);
			}
				
		});

		return await nodeListMutation.mutateAsync();
		// const { errcode, errmsg, result, LoginInfo } = res;
		// const {}
		// console.log('will get res:', res);
		// if (errcode != '0') {
		// 	throw new Error(t("sys.api.apiRequestFailed")+':'+errmsg);
		// }

		// // toast.success("Login success!");
		// return res;
	} catch (err) {
		toast.error(err.message, {
			position: "top-center",
		});
	}
};



export default useMgrInfoStore;

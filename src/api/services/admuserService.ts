// import apiClient from "../apiClient";

import type { MgrEntity } from "#/entity";
import admapiClient from "../admapiClient";

export interface LoginReq {
	username: string;
	password: string;
	captcha: string;
}

export type CommonApiRes = {
	errcode: string;
	errmsg: string;
	LoginInfo: {
		Mid: number;
		RoleId: number;
		LoginAt: string;
		MgrEnt: MgrEntity;
	}
	requestId: string;
}

export type LoginRes = CommonApiRes & {
	result: {
		'API-Token': string,
		mgr: MgrEntity,
	};
}

export enum AdmApi {
	// SignIn = "/auth/signin",
	LoginIn = "/admapi/login",
	Logout = "/admapi/logout",
	Refresh = "/auth/refresh", // TODO add
	User = "/user", // TODO add
}

// const signin = (data: SignInReq) =>
// 	admapiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const login = (data: LoginReq) =>
	admapiClient.post<LoginRes>({ url: AdmApi.LoginIn, data });
const logout = () => admapiClient.get({ url: AdmApi.Logout });
// const findById = (id: string) =>
// 	admapiClient.get<UserInfo[]>({ url: `${AdmApi.User}/${id}` });

export default {
	// signup,
	// findById,
	logout,
	login, // new
};

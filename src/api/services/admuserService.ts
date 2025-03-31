// import apiClient from "../apiClient";

import type { MgrEntity } from "#/entity";
import admapiClient from "../admapiClientOld";

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

export type NodeListReq = {
}

// 定义节点数据类型
export interface NodeData {
  Id: string;
  NodeName: string;
  ClusterId: string;
  Follow: string;
  NodeAddr: string;
  TotalSpace: number; // kB
  UsedSpace: number; // kB
  FileCount: number;
  Created: string;
  LastRegistered: string;
  TotalSpaceDesc?: string; 
  UsedSpaceDesc?: string; 
}

export type NodeListRes = CommonApiRes & {
	result: {
		list?: NodeData[],
		page: number,
		pagesize: number,
		total: number,
	};
}

export enum AdmApi {
	// SignIn = "/auth/signin",
	LoginIn = "/admapi/login",
	Logout = "/admapi/logout",
	NodeList = "/admapi/node/list",
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
const nodeList = (data: NodeListReq, apiToken?: string) =>
	admapiClient.post<NodeListRes>({ url: AdmApi.NodeList, data , headers:{"API-Token": apiToken}});

export default {
	// signup,
	// findById,
	logout,
	login, // new
	nodeList,
};

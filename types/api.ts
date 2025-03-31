export interface Result<T = any> {
	status: number;
	message: string;
	data?: T;
}

export interface ApiResult<TData = any, TLoginInfo = any> {
	errcode: string;
	errmsg: string;
	result?: TData;
	LoginInfo?: TLoginInfo;
}

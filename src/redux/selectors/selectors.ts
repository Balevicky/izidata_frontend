import { GlobalState } from "./type/globalState";

export const getAuthState = (state: GlobalState) => state.auth.isAuth;
export const getAuthToken = (state: GlobalState) => state.auth.token;
export const getUserID = (state: GlobalState) => state.auth.userId;
export const getProjectID = (state: GlobalState) => state.auth.projectId;
export const getModelID = (state: GlobalState) => state.auth.modelId;
export const getNotification = (state: GlobalState) =>
  state.datas.notifications;

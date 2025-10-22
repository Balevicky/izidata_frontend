import { NotificationData } from "../../actions/types";

interface AuthData {
  isAuth: boolean;
  token: string;
  userId: string;
  projectId: string;
  modelId: string;
}
export interface GlobalState {
  auth: AuthData;
  datas: NotificationData;
}

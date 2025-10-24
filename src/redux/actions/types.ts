import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  CONNECTED,
  LOGOUT,
  REMOVE_NOTIFICATION_ITEM,
} from "./actions";

// ============= Pour authentification
interface userConnectedData {
  token: string;
  userId: string;
  projectId: string;
  modelId: string;
}
export interface AuthAction {
  type: typeof CONNECTED | typeof LOGOUT;
  payload: userConnectedData | null;
}
// ============== Notification
export interface NotificationItem {
  _id: string;
  message: string;
  status: string;
  timeout: number;
}
export interface NotificationData {
  notifications: NotificationItem[];
}
export interface NotificationAction {
  type:
    | typeof ADD_NOTIFICATION
    | typeof REMOVE_NOTIFICATION_ITEM
    | typeof CLEAR_NOTIFICATION
    | null;
  payload: NotificationItem | null;
}

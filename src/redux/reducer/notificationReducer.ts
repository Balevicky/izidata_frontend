import { sonoreEffet } from "../../helpers/utils";
import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  REMOVE_NOTIFICATION_ITEM,
} from "../actions/actions";
import {
  NotificationAction,
  NotificationData,
  NotificationItem,
} from "../actions/types";

const initState: NotificationData = {
  notifications: [],
};
export const notificationReducers = (
  state = initState,
  action: NotificationAction = { type: null, payload: null }
) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      sonoreEffet();
      console.log("ADD_NOTIFICATION");

      return {
        notifications: [...state.notifications, action.payload],
      };

      break;
    case REMOVE_NOTIFICATION_ITEM:
      state.notifications = state.notifications.filter(
        (item: NotificationItem) => item._id !== action.payload?._id
      );
      return {
        notifications: [...state.notifications],
      };
      break;
    case CLEAR_NOTIFICATION:
      return {
        ...initState,
      };
      break;
    default:
      return state;
      break;
  }
};

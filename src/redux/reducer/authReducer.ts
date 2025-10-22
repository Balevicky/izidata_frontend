import { CONNECTED, LOGOUT } from "../actions/actions";
import { AuthAction } from "../actions/types";
import { getInitStore } from "../lib/initLib";

const initStore = getInitStore();
const initAction: AuthAction = {
  type: LOGOUT,
  payload: initStore,
};
export const authReducers = (
  state = initStore,
  action: AuthAction = initAction
) => {
  switch (action.type) {
    case CONNECTED:
      return {
        isAuth: true,
        token: action.payload?.token,
        userId: action.payload?.userId,
        projectId: action.payload?.projectId,
        modelId: action.payload?.modelId,
      };
      break;
    case LOGOUT:
      return {
        isAuth: false,
        token: "",
        userId: "",
        projectId: "",
        modelId: "",
      };
    default:
      return state;
      break;
  }
};

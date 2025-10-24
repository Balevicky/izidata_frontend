import { CONNECTED, LOGOUT } from "../actions/actions";
import { AuthAction } from "../actions/types";
import { getInitStore } from "../lib/initLib";

const initState = getInitStore();
const initAction: AuthAction = {
  type: LOGOUT,
  payload: initState,
};
export const authReducers = (
  state = initState,
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
      localStorage.removeItem("auth");
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

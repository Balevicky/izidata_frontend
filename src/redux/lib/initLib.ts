export const getInitStore = () => {
  let isAuth = false;
  let tokenData = "";
  let userIdData = "";
  let projectIdData = "";
  let modelIdData = "";

  let auth = localStorage.getItem("auth");
  if (auth) {
    const { token, userId, projectId, modelId } = JSON.parse(auth);
    isAuth = !!token && !!userId && !!projectId && !!modelId;
    if (isAuth) {
      tokenData = token;
      userIdData = userId;
      projectIdData = projectId;
      modelIdData = modelId;
    }
    return {
      isAuth: isAuth,
      token: tokenData,
      userId: userIdData,
      projectId: projectIdData,
      modelId: modelIdData,
    };
  }
};

export const apiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5001/api/";
  } else {
    return "http://192.168.0.130/server/api/";
  }
};
// console.log(apiUrl);

export const webApiUrl = apiUrl();

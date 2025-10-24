import { webApiUrl } from "../environements/environement";
import { cleanData } from "../helpers/utils";
import { User } from "../models/user";
import { setItem } from "../services/localStorage.service";
import { get, patchFile, postAuth, postFile, remove } from "./fecthHelpers";

export const getDatas = async (entityName: string) => {
  const url = webApiUrl + entityName;

  const datas = await get(url);

  return cleanData(datas);
};
// ==============
export const getDatasByProject = async (entityName: string, id: string) => {
  const url = webApiUrl + entityName + "/" + id;

  const datas = await get(url);

  return cleanData(datas);
};
// ==============
export const getDatasByProjectByPage = async (
  entityName: string,
  id: string,
  page = 1,
  limit = 5,
  sortby = "asc"
) => {
  const url =
    webApiUrl +
    entityName +
    "/" +
    id +
    "/by/page" +
    "?pageNumber=" +
    page +
    "&pageLimit=" +
    limit +
    "&sortBy=" +
    sortby;
  console.log(url);

  const datas = await get(url);
  return cleanData(datas);
};

// ===============
// ==============
export const getDatasByPage = async (
  entityName: string,
  page = 1,
  limit = 5,
  sortby = "asc"
) => {
  const url =
    webApiUrl +
    entityName +
    "/by/page" +
    "?pageNumber=" +
    page +
    "&pageLimit=" +
    limit +
    "&sortBy=" +
    sortby;
  console.log(url);

  const datas = await get(url);
  return cleanData(datas);
};

// ===============
export const searchDatas = async (
  entityName: string,
  query: string,
  page = 1,
  limit = 8,
  sortby = "asc"
) => {
  const url =
    webApiUrl +
    entityName +
    "/" +
    query +
    "/by/page" +
    "?pageNumber=" +
    page +
    "&pageLimit=" +
    limit +
    "&sortBy=" +
    sortby;
  const datas = await get(url);
  return cleanData(datas);
};
// // ===============
// export const searchDatas = async (
//   entityName: string,
//   query: string,
//   page = 1,
//   limit = 8
// ) => {
//   const url =
//     webApiUrl +
//     entityName +
//     "/search?" +
//     query +
//     "&pageNumber=" +
//     page +
//     "&pageLimit=" +
//     limit;
//   const datas = await get(url);
//   return cleanData(datas);
// };
// ===============
// export const getDatasBySlug = async (entityName: string, slug: string) => {
//   const url = webApiUrl + entityName + "/by/slug/" + slug;
//   const datas = await get(url);
//   return cleanData(datas);
// };

// ===============

export const addData = async (entityName: string, data: any) => {
  const url = webApiUrl + entityName;
  const datas = await postFile(url, data);
  console.log(data);
  // console.log(params);
  console.log(datas);

  return datas;
};
// ===============
export const updateData = async (entityName: string, id: string, data: any) => {
  const url = webApiUrl + entityName + "/" + id;
  const datas = await patchFile(url, data);
  return datas;
};
// ===============
export const deleteData = async (entityName: string, id: string) => {
  const url = webApiUrl + entityName + "/" + id;
  const datas = await remove(url);
  return datas;
};
// ===============

export const signup = async (user: User) => {
  const url = webApiUrl + "users/signup";
  console.log(url);

  const datas = await postAuth(url, user);
  return datas;
};
// ===============
export const signin = async (user: User) => {
  const url = webApiUrl + "users/login";
  console.log(url);

  const datas = await postAuth(url, user);
  if (datas.isSuccess) {
    // auth success
    setItem("auth", {
      token: datas.token,
      userId: datas.userId,
      projectId: "",
      modelId: "",
    });
    // console.log(datas);
  }
  return datas;
};

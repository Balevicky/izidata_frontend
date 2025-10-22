import { getToken } from "../helpers/utils";

export const get = async (url: string, options: any = {}) => {
  try {
    // ================ pour securité
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    };
    // ========================
    const response = await fetch(url, options);
    if (!response.ok) {
      return {
        isSuccess: false,
      };
    }
    return await response.json();
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};
// ===================

export const postFile = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = "POST";
    options.body = data;
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      Authorization: "Bearer " + getToken(),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.json();
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      error,
    };
  }
};
// ===================
// ===================

export const postAuth = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = "POST";
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    };
    console.log(options);

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.json();
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      error,
    };
  }
};
// ===================
export const patchFile = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = "PATCH";
    options.body = data;
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};
// ===================
export const patchAuth = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = "PATCH";
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};
// ===================
export const remove = async (url: string, options: any = {}) => {
  try {
    options.method = "DELETE";
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      return {
        ...error,
        isSuccess: false,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};

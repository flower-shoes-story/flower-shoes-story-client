export const postLogin = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const getAuthCheck = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/check`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const updateUser = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/update`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    return await response.json();
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

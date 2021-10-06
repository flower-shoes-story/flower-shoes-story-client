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

export const postData = async (config) => {
  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config.postData),
    });

    return await response.json();
  } catch (err) {
    throw err;
  }
};

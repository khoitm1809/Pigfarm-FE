import http from "./https";

export const axiosBaseQuery = () => async ({ url, method = "GET", data, params }) => {
  try {
    const result = await http({ url, method, data, params });
    return { data: result.data };
  } catch (err) {
    return {
      error: {
        status: err?.response?.status || 500,
        data: err?.response?.data || err.message || "Unknown error",
      }
    };
  }
};

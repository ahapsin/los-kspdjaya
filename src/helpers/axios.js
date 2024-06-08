import axios from "axios";
export async function useApi({ ...args }) {
  try {
    const response = await axios({
      method: args.method,
      data: args.data,
      params: args.params,
      headers: {
        ...args.header,
        "Content-type": "application/json",
        Authorization: `Bearer ${args.token}`,
      },
      baseURL: import.meta.env.VITE_APP_API_BASE + args.api,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error.response };
  }
}

const useAPIPost = async (route, payload, token) => {
  const apibase = import.meta.env.VITE_APP_API_BASE;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = [];
  try {
    await axios.post(`${apibase}${route}`, payload, config).then((res) => {
      data.push(res.data.response);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { useAPIPost };

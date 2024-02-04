import axios from "axios";

export const post = async <Data>(url: string, body: Data) => {
  try {
    const { data } = await axios.post(url, body);

    return [data, null];
  } catch (error: any) {
    return [null, error.response?.data];
  }
};
export const get = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return [data, null];
  } catch (error: any) {
    return [null, error.response.data];
  }
};
export const put = async <T>(url: string, body?: T) => {
  try {
    const { data } = await axios.put(url, body);
    return [data, null];
  } catch (error: any) {
    console.log(error);
    return [null, error?.response?.data];
  }
};
export const Delete = async (url: string) => {
  try {
    const { data } = await axios.delete(url);
    return [data, null];
  } catch (error: any) {
    return [null, error.response.data];
  }
};

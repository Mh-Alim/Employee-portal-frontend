import { getTokenFromLocalStorage } from "../utility";

const searchApi = async (queryParam: string, query: string) => {
  console.log("SearchApi: ", queryParam, query);
  let token = getTokenFromLocalStorage();
  if (!token) {
    alert("token does not exist");
    return;
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ query }), // Convert data to JSON string
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/search?${queryParam}=${query}`,
    options
  );
  const json = await res.json();
  console.log("queryParams: ", queryParam, json.data);
  return json.data;
};

let timeoutId: any;
export const debounce = (query: string, queryParam: string,setResults:(a:string[][])=>void, delay: number) => {
  clearTimeout(timeoutId);
  let a:string[][] = [];
  timeoutId = setTimeout(async () => {
    a = await searchApi(queryParam, query);
    setResults(a);
  }, delay);
};
import { useEffect, useState } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [err, setErr] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    console.log(postData);
    setOptions({
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  useEffect(() => {
    const getFetch = async () => {
      setIsPending(true);
      setErr(null);

      try {
        setIsPending(false);
        const response = await fetch(url, { ...options });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        setData(json);
      } catch (error) {
        setIsPending(false);
        setErr("Could not fetch the data");
        console.log(error);
      }
    };

    if (method === "GET") {
      getFetch();
    }

    if (options && method === "POST") {
      getFetch(options);
    }
  }, [url, method, options]);

  return { data, isPending, err, postData };
};

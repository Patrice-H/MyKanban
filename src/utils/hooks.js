import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch(url).then((response) => {
      response.json().then((data) => {
        setData(data.data);
        setMessage(data.message);
      });
    });
  }, [url]);

  return { data, message };
};

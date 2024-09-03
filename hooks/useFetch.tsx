'use client';
export const useFetch = async (url: string, init: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(url, init);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      // return Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  return await fetchData();
};

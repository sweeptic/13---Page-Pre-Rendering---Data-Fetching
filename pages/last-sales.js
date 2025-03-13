import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LastSalesPage() {
  const { data, error } = useSWR('https://api.restful-api.dev/objects', fetcher);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Last Sales Page</h1>

      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

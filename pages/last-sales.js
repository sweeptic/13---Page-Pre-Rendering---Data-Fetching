import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LastSalesPage() {
  //   const [phones, setPhones] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('https://api.restful-api.dev/objects', fetcher);
  //   const { data, error, isLoading } = useSWR('/api/user', fetcher);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  //   setPhones(data);

  //   useEffect(() => {
  //     async function fetchApi() {
  //       setIsLoading(true);
  //       const res = await fetch('https://api.restful-api.dev/objects');
  //       const data = await res.json();
  //       setPhones(data);
  //       setIsLoading(false);
  //     }

  //     fetchApi();
  //   }, []);

  //   useEffect(() => {
  //     console.log('phones state have changed', phones);
  //   }, [phones]);

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

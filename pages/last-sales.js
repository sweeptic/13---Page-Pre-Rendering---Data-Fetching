import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LastSalesPage(props) {
  const [phones, setPhones] = useState(props.data);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('https://api.restful-api.dev/objects', fetcher);

  //   const { data, error, isLoading } = useSWR('/api/user', fetcher);

  //   useEffect(() => {
  //     console.log('data', data);
  //   }, [data]);

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

  useEffect(() => {
    setPhones(data);
    console.log('SWR runs');
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !phones) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Last Sales Page</h1>

      <ul>
        {phones?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  async function fetchApi() {
    const res = await fetch('https://api.restful-api.dev/objects');
    return await res.json();
  }
  const data = await fetchApi();
  console.log('getStaticProps runs');

  return {
    props: { data },
    revalidate: 10,
  };
}

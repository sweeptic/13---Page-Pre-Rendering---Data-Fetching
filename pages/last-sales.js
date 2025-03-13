import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LastSalesPage(props) {
  const [phones, setPhones] = useState(props.data);
  const { data, error } = useSWR('https://api.restful-api.dev/objects', fetcher);

  useEffect(() => {
    setPhones(data);
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

  return {
    props: { data },
    revalidate: 10,
  };
}

import { useEffect, useState } from 'react';

export default function LastSalesPage() {
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      setIsLoading(true);
      const res = await fetch('https://api.restful-api.dev/objects');
      const data = await res.json();
      setPhones(data);
      setIsLoading(false);
    }

    fetchApi();
  }, []);

  useEffect(() => {
    console.log('phones state have changed', phones);
  }, [phones]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!phones.length) {
    return <p>No data yet</p>;
  }

  return (
    <>
      <h1>Last Sales Page</h1>

      <ul>
        {phones.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

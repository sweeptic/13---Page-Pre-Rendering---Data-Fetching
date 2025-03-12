import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

// This page is pre rendered by default
function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// Runs in build time with 'next build' script
export async function getStaticProps(context) {
  console.log('Re generating...');
  console.log('context', context);

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  //const data = undefined;
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: { destination: '/no-data' },
    };
  }

  if (data.products.length === 0) {
    return { notfound: true };
  }

  return {
    props: {
      products: data.products,
    },
    //  just in production
    revalidate: 10,
    // notFound: true,
  };
}

export default HomePage;

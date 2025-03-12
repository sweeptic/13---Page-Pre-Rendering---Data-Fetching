import fs from 'fs/promises';
import path from 'path';

// This page is pre rendered by default
function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// Runs in build time with 'next build' script
export async function getStaticProps() {
  console.log('Re generating...');

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    //  just in production
    revalidate: 3,
  };
}

export default HomePage;

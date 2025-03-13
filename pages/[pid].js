import fs from 'fs/promises';
import path from 'path';

export default function ProductDetail(props) {
  const { loadedProduct } = props;

  //   if (!loadedProduct) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  //const data = undefined;
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 3x hivja a getstaticpropsot mert itt 3 path van
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const paths = ids.map((pid) => ({ params: { pid } }));

  return { paths, fallback: 'blocking' };

  return {
    paths: [
      //    pre generate
      { params: { pid: 'p1' } },
      //   { params: { pid: 'p2' } },
      //   { params: { pid: 'p3' } }
    ],
    //  postpone generation pages
    // fallback: true,
    fallback: 'blocking',
  };
}

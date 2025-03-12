import fs from 'fs/promises';
import path from 'path';

export default function ProductDetail(props) {
  const { loadedProduct } = props;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  //const data = undefined;
  const data = JSON.parse(jsonData);

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 3x hivja a getstaticpropsot mert itt 3 path van
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }],
    fallback: false,
  };
}

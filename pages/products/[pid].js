import fs from 'fs/promises';
import path from 'path';

export default function ProductDetail(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, sequi vero fugit placeat architecto velit omnis
        hic fugiat vitae? Sed aliquid consequatur est suscipit sequi culpa veniam quos totam illum alias! Ducimus ab,
        natus a ipsam veniam nisi voluptatum aliquam voluptates accusamus, iste alias velit eveniet similique ut animi
        repellendus? Quidem quis laborum consequatur itaque magni maiores molestias, vitae facilis.
      </p>
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
  console.log('getStaticProps RUNS');

  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((item) => item.id === productId);

  if (!product) {
    return { notFound: true };
  }

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

  return { paths, fallback: true };

  //   return {
  //     paths: [
  //       //    pre generate
  //       { params: { pid: 'p1' } },
  //       { params: { pid: 'p2' } },
  //       { params: { pid: 'p3' } },
  //     ],
  //     //  postpone generation pages
  //     // fallback: true,
  //     fallback: 'blocking',
  //   };
}

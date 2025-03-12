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
  console.log('context', context);

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  //const data = undefined;
  const data = JSON.parse(jsonData);

  const product = data.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

function HomePage(props) {
  console.log('props', props);

  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// This page is pre rendered by default

// runs in build time
export async function getStaticProps() {
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
    },
  };
}

export default HomePage;

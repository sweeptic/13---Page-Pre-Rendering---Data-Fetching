export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  // full req object
  const { params, req, res } = context;
  //   console.log('params', params);
  console.log('req', req.cookies);
  //   console.log('res', res);

  return {
    props: {
      username: 'Max',
    },
  };
}

export default function UserIdPage(props) {
  console.log('props', props);

  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  console.log('userId', params.uid);

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}

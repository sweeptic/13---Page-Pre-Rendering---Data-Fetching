export default function UserIdPage(props) {
  console.log('props', props);

  return (
    <h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis cum nesciunt amet, repellat facilis tenetur?
        Blanditiis fugiat consectetur aliquid facere temporibus repellat cupiditate provident recusandae ut ex, fuga
        quisquam delectus omnis ipsam. Necessitatibus quibusdam veritatis repellendus cupiditate, consequatur pariatur
        nemo dolore culpa ex, tempore, nulla sequi perspiciatis! Eum nulla hic eveniet voluptatibus commodi vitae id
        consequuntur minima autem tenetur fuga assumenda possimus excepturi nobis sit, perspiciatis fugit sunt ipsum
        architecto doloribus quae ratione, similique a? Quisquam impedit tempora itaque placeat reiciendis deserunt ipsa
        libero vitae dolores, quae tenetur consequatur quos quaerat ut, quidem quasi ipsam doloremque. Culpa pariatur
        labore nostrum.
      </p>

      {props.id}
    </h1>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  //   console.log('server side code');

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}

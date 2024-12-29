export default async function Page({ params }: { params: { userid: string } }) {
  const { userid } = params;

  return <p>Post: {userid}</p>;
}

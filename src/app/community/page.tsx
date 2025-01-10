export default async function CommunityPage() {
  const communityRanking = await fetch(
    new URL("/api/community", process.env.BASE_URL),
    { next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 } }
  ).then((res) => res.json());

  return (
    <>
      <h1>Use StaticTierList component later</h1>
      {Object.keys(communityRanking).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {JSON.stringify(communityRanking[key])}
        </div>
      ))}
    </>
  );
}

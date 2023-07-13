const GenrePage = ({ params }) => {
  const { id, slug } = params;
  console.log("Genre slug: ", slug);
  return <div className="text-red-600">SIDEBAR INDIVIDUAL GENRE PAGE: {params.slug}</div>;
};

export default GenrePage;

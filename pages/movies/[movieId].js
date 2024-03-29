import axios from "axios";
const Detail = ({ movie: { id, original_title, overview, poster_path } }) => {
  return (
    <div className="container">
      <h1>Movie detail</h1>

      {id && (
        <>
          <h2>{original_title}</h2>
          <p>{overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={poster_path}
          />
        </>
      )}
    </div>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/movie/popular?api_key=b967ca14675f5b003835882b5dbd8544&language=en-US&page=1"
  );

  return {
    paths: movies.map(({ id: movieId }) => ({
      params: { movieId: movieId.toString() },
    })),

    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const {
    params: { movieId },
  } = ctx;

  const { data: movie } = await axios(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=b967ca14675f5b003835882b5dbd8544`
  );

  return {
    props: {
      movie,
      revalidate: 1,
    },
  };
};

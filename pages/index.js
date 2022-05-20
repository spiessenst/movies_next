import axios from "axios";
import Link from "next/link";

function Home({ movies }) {
  return (
    <div className="container">
      <h1>Popular Movies</h1>
      <section className="movieGrid">
        {movies &&
          movies.map(({ id, poster_path }) => (
            <Link key={id} href={`/movies/${id}`}>
              <article>
                <a>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={poster_path}
                  />
                </a>
              </article>
            </Link>
          ))}
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/movie/popular?api_key=b967ca14675f5b003835882b5dbd8544&language=en-US&page=1"
  );
  return {
    props: {
      movies,
    },
    revalidate: 600,
  };
};

export default Home;

import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DetailsContext } from "../../contexts/DetailsContext";
import Loading from "../../components/loading/Loading";
import Api from "../../Api";

const World = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setDetailArticle } = useContext(DetailsContext);

  const getArticlesData = async () => {
    try {
      const { data } = await Api.get(
        "/technology.json?api-key=BkGZkAsENjFiJ9qka1Gy6GOHAmuRIxGF"
      );
      const { results } = data;
      setArticles(results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticlesData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1>Technology</h1>
      {articles.map((el) => (
        <Link
          key={el.uri}
          to={`/details/${el.uri.split("/")[3]}`}
          onClick={() => {
            setDetailArticle(el);
          }}
          className="content"
        >
          <div>
            <h1>{el.title}</h1>
            <small>{moment(el.published_date).format("DD/MM/YYYY")}</small>
            <p>{el.byline}</p>
            <p>{el.abstract}</p>
          </div>

          <div>
            {el.multimedia === null ? (
              <img
                src="https://cna.com.br/Content/uploads/blogposts/os-melhores-sites-de-noticias-em-ingles-para-estudar.jpg"
                width="350px"
                alt="alt"
              />
            ) : (
              <img src={el.multimedia[1].url} width="350px" alt="" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default World;

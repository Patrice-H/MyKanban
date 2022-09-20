import Thumbnail from '../../components/Thumbnail';

const Home = () => {
  const pages = [1];

  return (
    <div>
      <h1>Tableau de bord</h1>
      {pages.map((page) => (
        <Thumbnail key={`thumbnail-${page}`} pageId={page} />
      ))}
    </div>
  );
};

export default Home;

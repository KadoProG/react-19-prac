import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ホームページ</h1>
      <p>ようこそ、ホームページへ！</p>
      <nav>
        <Link to="/about">Aboutページへ</Link>
        <Link to="/register">Registerページへ</Link>
        <Link to="/register2">Register2ページへ</Link>
      </nav>
    </div>
  );
};

export default Home;

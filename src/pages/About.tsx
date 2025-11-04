import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Aboutページ</h1>
      <p>これはAboutページです。</p>
      <nav>
        <Link to="/">ホームページへ</Link>
      </nav>
    </div>
  );
};

export default About;

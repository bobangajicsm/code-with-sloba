import styles from 'components/home.module.scss';
import Header from './header';
import Technologies from './technologies';
import LatestOnYoutube from './latest-on-youtube';
import Socials from './socials';

function Home() {
  return (
    <main>
      <div className={styles.jumbotronWrapper}>
        <Header />
      </div>
      <Technologies />
      <LatestOnYoutube />
      <Socials />
    </main>
  );
}

export default Home;

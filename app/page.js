import styles from "components/home.module.scss";
import Header from "./header";
import Technologies from "./technologies";
import LatestOnYoutube from "./latest-on-youtube";
import Socials from "./socials";
import { Analytics } from "@vercel/analytics/react";

function Home() {
  return (
    <main>
      <div className={styles.jumbotronWrapper}>
        <Header />
      </div>
      <Technologies />
      <LatestOnYoutube />
      <Socials />
      <Analytics />
    </main>
  );
}

export default Home;

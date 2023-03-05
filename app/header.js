"use client";
import styled from "/components/home.module.scss";
import Newsletter from './newsletter';

function Header() {
  return (
    <header className={styled.header}>
      <div className={styled.jumbotron}>
        <div className={styled.jumbotronTitleWrapper}>
          <h1 className={styled.jumbotronTitle}>
            Become a <span>Web</span> <br /> master with
            <br /> <span>daily</span> and <span>weekly</span> tips
          </h1>
          <p className={styled.jumbotronDescription}>
            Stay updated with the latest tips, tricks, and tutorials on{" "}
            <b>Web Development</b>. Join our community of <b>200k</b> followers
            and never miss a week of valuable insights!
          </p>
          <Newsletter />
        </div>
        <div className={styled.jumbotronImageWrapper}>
          <div>
            <h2 className={styled.jumbotronImageTitle}>Slobodan Gajić</h2>
            <h2 className={styled.jumbotronImageSubTitle}>
              Educator<span className={styled.jumbotronImageDot}>•</span> Senior
              JavaScript Developer
              <span className={styled.jumbotronImageDot}>•</span> YouTuber
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

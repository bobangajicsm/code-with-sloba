"use client";
import styled from "/components/home.module.scss";
import Newsletter from "./newsletter";

function Header() {
  return (
    <header className={styled.header}>
      <div className={styled.jumbotron}>
        <div className={styled.jumbotronTitleWrapper}>
          <h1 className={styled.jumbotronTitle}>
            <span>Master</span> coding with just <span>2</span> minutes a{" "}
            <span>day</span>!
          </h1>
          <p className={styled.jumbotronDescription}>
            Get a <b>weekly</b> digest of my <b>tips</b> and <b>tutorials</b> by
            subscribing now
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

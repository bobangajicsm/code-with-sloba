"use client";
import styled from "/components/home.module.scss";
import Newsletter from "./newsletter";

function Header() {
  return (
    <header className={styled.header}>
      <div className={styled.jumbotron}>
        <div className={styled.jumbotronTitleWrapper}>
          <h1 className={styled.jumbotronTitle}>
            Level up your <span>Frontend</span>
            <span> skills</span> with my expert <br /> <span>tips</span> and{" "}
            <span>tutorials</span>
          </h1>
          <p className={styled.jumbotronDescription}>
            Become one of the <b>200k+</b> developers in my community. <br />
            Every Wednesday receive one practical tip, that
            you can effortlessly put into practice.
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

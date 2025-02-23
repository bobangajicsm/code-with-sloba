import Jumbotron from "./components/jumbotron";
import styles from "./components/landing.module.scss";
import Carousel from "./components/carousel";
import AnimatedTitle from "@/app/components/animated-title";
import Explanation from "@/app/components/explanation";
import Sandbox from "@/app/components/sandbox";
import Questionaire from "@/app/components/questionaire";
import Support from "@/app/components/support";
import DontWait from "@/app/components/dont-wait";

function Landing() {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.backgroundGrid}
        width="2469"
        height="1679"
        viewBox="0 0 2469 1679"
        fill="none"
      >
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1303.48 54.1497)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1885.92 442.44)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1594.7 248.295)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2177.13 636.585)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1449.09 151.222)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2031.52 539.512)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1740.31 345.367)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2322.74 733.657)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1375.87 102.408)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1959.14 491.253)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1667.92 297.108)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2250.35 685.398)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1521.48 199.481)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2104.74 588.326)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1813.53 394.181)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2395.96 782.471)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2397.79 878.122)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1816.69 1268.41)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2107.24 1073.27)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1526.14 1463.56)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2325.57 926.63)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1744.47 1316.92)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2034.19 1122.33)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1453.09 1512.62)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2252.51 975.694)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1671.42 1365.98)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1961.96 1170.84)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1380.87 1561.13)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2180.29 1024.2)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1599.2 1414.49)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1888.91 1219.9)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1307.82 1610.19)"
          fill="#1B1E22"
        ></rect>
        <rect
          x="436.002"
          width="1596"
          height="711"
          fill="url(#paint0_linear_1080_817)"
        ></rect>
        <rect
          x="2032"
          y="1679"
          width="1596"
          height="819"
          transform="rotate(180 2032 1679)"
          fill="url(#paint1_linear_1080_817)"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_1080_817"
            x1="1234"
            y1="0"
            x2="1234"
            y2="711"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18181b"></stop>
            <stop offset="1" stopColor="#18181b" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_1080_817"
            x1="2830"
            y1="1679"
            x2="2830"
            y2="2498"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18181b"></stop>
            <stop offset="0.546557" stopColor="#18181b"></stop>
            <stop offset="1" stopColor="#18181b" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
      <main className={styles.container}>
        <Jumbotron />
        <AnimatedTitle
          title={"Learn 10+ different technologies"}
          subtitle="Get access to CwS published posts in organized way by technologies and difficulties"
        />
        <div className={styles.carousel}>
          <Carousel left random />
          <Carousel />
          <Carousel left />
          <div className={styles.carouselOverlay}></div>
        </div>
        <Explanation />
        <Sandbox />
        <Questionaire />
        <Support />
        <DontWait />
      </main>
      <svg
        className={styles.bottomGrid}
        width="2469"
        height="1679"
        viewBox="0 0 2469 1679"
        fill="none"
      >
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1303.48 54.1497)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1885.92 442.44)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1594.7 248.295)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2177.13 636.585)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1449.09 151.222)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2031.52 539.512)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1740.31 345.367)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2322.74 733.657)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1375.87 102.408)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1959.14 491.253)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1667.92 297.108)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2250.35 685.398)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1521.48 199.481)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2104.74 588.326)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 1813.53 394.181)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(0.83205 0.5547 -0.830139 0.557556 2395.96 782.471)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2397.79 878.122)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1816.69 1268.41)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2107.24 1073.27)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1526.14 1463.56)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2325.57 926.63)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1744.47 1316.92)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2034.19 1122.33)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1453.09 1512.62)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2252.51 975.694)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1671.42 1365.98)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1961.96 1170.84)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1380.87 1561.13)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 2180.29 1024.2)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1599.2 1414.49)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1888.91 1219.9)"
          fill="#1B1E22"
        ></rect>
        <rect
          width="2"
          height="1485"
          transform="matrix(-0.830139 0.557556 -0.83205 -0.5547 1307.82 1610.19)"
          fill="#1B1E22"
        ></rect>
        <rect
          x="436.002"
          width="1596"
          height="711"
          fill="url(#paint0_linear_1080_817)"
        ></rect>
        <rect
          x="2032"
          y="1679"
          width="1596"
          height="819"
          transform="rotate(180 2032 1679)"
          fill="url(#paint1_linear_1080_817)"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_1080_817"
            x1="1234"
            y1="0"
            x2="1234"
            y2="711"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18181b"></stop>
            <stop offset="1" stopColor="#18181b" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_1080_817"
            x1="2830"
            y1="1679"
            x2="2830"
            y2="2498"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18181b"></stop>
            <stop offset="0.546557" stopColor="#18181b"></stop>
            <stop offset="1" stopColor="#18181b" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Landing;

"use client";

import Slider from "react-slick";
import styles from "./slick-slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Post {
  images: string[];
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      style={{
        top: "50%",
        transform: "translate(0, -50%)",
        position: "absolute",
        left: "-25px",
        cursor: "pointer",
      }}
    >
      <ArrowLeft size={16} onClick={onClick} />
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      style={{
        top: "50%",
        transform: "translate(0, -50%)",
        position: "absolute",
        right: "-25px",
        cursor: "pointer",
      }}
    >
      <ArrowRight size={16} onClick={onClick} />
    </div>
  );
}

export default function SlickSlider({ post }: { post: Post }) {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles.slideContainer}>
      {showSlider && (
        <Slider {...settings}>
          {post.images.map((img, index) => (
            <div key={index} className={styles.slideItem}>
              <Image
                src={img}
                alt={`Slide ${index}`}
                priority={index === 0}
                className={styles.image}
                width={1200}
                height={800}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

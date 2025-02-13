"use client";

import Slider from "react-slick";
import styles from "./slick-slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Post {
  images: string[];
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
  };

  return (
    <div className={styles.slideContainer}>
      {showSlider && (
        <Slider {...settings}>
          {post.images.map((img, index) => (
            <div key={index} className={styles.slideItem}>
              <Image
                width={300}
                height={375}
                src={img}
                alt={`Slide ${index}`}
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

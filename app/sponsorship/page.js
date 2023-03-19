import styles from "/components/sponsorship.module.scss";

import Link from "next/link";
import Image from "next/image";

function Page() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sponsorship of Code with Sloba</h1>
      <h2 className={styles.subtitle}>Audience</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          My subscriber&apos;s base is primarily composed of professionals from
          the software industry, including software engineers and architects.
        </li>
        <li className={styles.listItem}>
          Additionally, a significant portion of subscribers include engineering
          managers, VPs of Engineering, CTOs, and other decision-makers in
          leadership positions.
        </li>
        <li className={styles.listItem}>
          The readership extends across 39 US states and 134 countries and
          includes individuals working at companies ranging from small
          businesses to those in the FAANG category.
        </li>
      </ul>
      <hr className={styles.hr} />
      <h2 className={styles.subtitle}>Newsletter advertisement format</h2>
      <p className={styles.marginBottom}>
        My newsletter is formatted as{" "}
        <b className={styles.highilight}>text-only</b>, as this has been found
        to generate the highest engagement. <br />
        <br /> The ad copy consists of one to two sentences, accompanied by a
        link and an optional small logo.
      </p>
      <hr className={styles.hr} />
      <h2 className={`${styles.subtitle} ${styles.subtitleSection}`}>
        Social media advertisement format
      </h2>
      <p>
        You get advertized on my <b className={styles.highilight}>daily</b> post
        with one sentence featuring your company/product. <br />
        It&apos;s placed under the post title. <br />
        Bellow, you can see <b className={styles.highilight}>analytics</b> of
        one of the <b className={styles.highilight}>best-performing</b> posts in
        the last year. <br /> Check it =&gt;
        <Link
          className={styles.postLink}
          href="https://www.instagram.com/p/ChjQnmbM01E/?utm_source=ig_web_copy_link"
          target="_blank"
        >
          here
        </Link>
        .
      </p>
      <br />
      <br />

      <Image
        src="/images/reach.png"
        alt="Instagram reach"
        width={674}
        height={547}
        className={styles.analyticsImage}
      />
      <Link className={styles.link} href="mailto:collab.with.sloba@gmail.com">
        Get in touch
      </Link>
    </div>
  );
}

export default Page;

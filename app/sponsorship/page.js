import styles from "/components/sponsorship.module.scss";

import Link from "next/link";

function Page() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sponsorship of Code with Sloba</h1>
      <h2 className={styles.subtitle}>Audience</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          My newsletter&apos;s subscriber base is primarily composed of professionals
          from the software industry, including software engineers and
          architects.
        </li>
        <li className={styles.listItem}>
          Additionally, a significant portion of subscribers include engineering
          managers, VPs of Engineering, CTOs, and other decision-makers in
          leadership positions.
        </li>
        <li className={styles.listItem}>
          The readership extends across 42 US states and 135 countries and
          includes individuals working at companies ranging from small
          businesses to those in the FAANG category.
        </li>
      </ul>
      <hr className={styles.hr} />
      <h2 className={styles.subtitle}>Advertisement format</h2>
      <p>
        My newsletter is formatted as <b>text-only</b>, as this has been found to
        generate the highest engagement. When you place an ad in the newsletter,
        it will be the only one featured in that issue. The ad copy consists of
        one to two sentences, accompanied by a link and an optional small logo.
      </p>
      <Link className={styles.link} href="mailto:collab.with.sloba@gmail.com">Get in touch</Link>
    </div>
  );
}

export default Page;

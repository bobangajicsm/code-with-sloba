import styles from "./article-aside.module.scss";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function generateTableOfContents(content: string): TocItem[] {
  // Match h1-h6 tags
  const headingRegex = /<h([1-6]).*?>(.*?)<\/h[1-6]>/g;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ""); // Remove any nested HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

    toc.push({ id, text, level });
  }

  return toc;
}

interface TableOfContentsProps {
  content: string;
}

export default function ArticleAside({ content }: TableOfContentsProps) {
  const tocItems = generateTableOfContents(content);

  return (
    <nav className={styles.tocContainer}>
      <h3 className={styles.tocTitle}>On this page</h3>
      <ul className={styles.tocList}>
        {tocItems.map((item, i) => (
          <li
            key={i}
            className={styles.tocItem}
            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
          >
            <a href={`#${item.id}`} className={styles.tocLink}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

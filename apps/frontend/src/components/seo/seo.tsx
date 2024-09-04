import Head from "next/head";
import { FC } from "react";

const Seo: FC<{ title: string; description: string; img?: string }> = ({
  title,
  img,
  description,
}) => {
  const t = `DevFest AI 2024 - ${title}`;
  return (
    <Head>
      <title>{t}</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={img || "https://devfest.ai/social-preview.png"}
      />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;

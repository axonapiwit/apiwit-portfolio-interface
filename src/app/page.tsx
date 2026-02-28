import HomeClient from "./page.client";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Apiwit",
  url: "https://apiwit.xyz",
  jobTitle: "Frontend Developer",
  description:
    "Frontend Developer & Creative Coder specializing in React, Next.js, and interactive web experiences.",
  sameAs: [
    "https://github.com/axonapiwit",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}

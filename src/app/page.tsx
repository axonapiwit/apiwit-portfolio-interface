import HomeClient from "./page.client";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Apiwit Thammachai",
  url: "https://apiwit.xyz",
  jobTitle: "Frontend Developer",
  worksFor: { "@type": "Organization", name: "Maxion Tech" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Phayao" },
  description:
    "Frontend Developer specializing in React, Next.js, TypeScript, and interactive web experiences.",
  sameAs: [
    "https://github.com/axonapiwit",
    "https://linkedin.com/in/apiwit",
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

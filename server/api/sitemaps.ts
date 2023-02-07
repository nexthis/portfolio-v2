import { createClient } from "@prismicio/client";
export default defineEventHandler(async (event) => {
  // Wait for better support sitemaps
  // const router = useRouter();

  const client = createClient("https://pawel-romanowski.prismic.io/api/v2", {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  const data = await client.getAllByType("portfolio");
  const site = process.env.BASE_URL;
  setHeader(event, "content-type", "text/xml");

  //better use URL instance to concatenate url
  return `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
      <loc>${site}</loc>
      <lastmod>2023-02-07T22:42:55+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>${site}portfolio</loc>
      <lastmod>2023-02-07T22:42:55+00:00</lastmod>
      <priority>0.30</priority>
    </url>
    <url>
      <loc>${site}en</loc>
      <lastmod>2023-02-07T22:42:55+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>${site}en/portfolio</loc>
      <lastmod>2023-02-07T22:42:55+00:00</lastmod>
      <priority>0.30</priority>
    </url>
    ${data.map(
      (item) => `
      <url>
        <loc>${site}portfolio/${item.uid}</loc>
        <lastmod>2023-02-07T22:42:55+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${site}en/portfolio/${item.uid}</loc>
        <lastmod>2023-02-07T22:42:55+00:00</lastmod>
        <priority>0.80</priority>
      </url>
    `
    )}

  </urlset>
  `;
});

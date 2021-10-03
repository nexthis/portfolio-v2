import type {GetServerSideProps} from "next";
import {Client} from "../helpers/prismic";
import Prismic from "@prismicio/client";

const Sitemap = () => {
};

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

    const staticPages = [
        '',
        'portfolio'
    ]

    const client = Client();

    const data = await client.query(
        Prismic.Predicates.at('document.type', 'portfolio'),
        {orderings: '[my.portfolio.created desc]', pageSize: 100, lang: 'pl'}
    );

    let sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
              http://www.w3.org/TR/xhtml11/xhtml11_schema.html
              http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
              xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
              xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
              xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${staticPages
        .map((url) => {
            return `
            <url>
              <loc>${baseUrl}/${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${url === "" ? "1.0" : "0.5"}</priority>
              <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${url}" />
            </url>
          `;
        })
        .join("")}
        ${data.results.map((item, index) => {
        return `
            <url>
              <loc>${baseUrl}/portfolio/${item.uid}</loc>
              <lastmod>${new Date(Date.parse(item.last_publication_date!)).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>"1.0"</priority>
              <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/portfolio/${item.uid}" />
            </url>
          `;
    })}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
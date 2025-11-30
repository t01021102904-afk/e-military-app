import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://v0-e-mailitary-website-build.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/my-letters/", "/settings/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

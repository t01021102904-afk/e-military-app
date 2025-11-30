import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.e-mailitary.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/my-letters",
          "/settings",
          "/auth/verify-otp",
          "/auth/verify-login",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

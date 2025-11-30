import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://v0-e-mailitary-website-build.vercel.app"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/write`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic news pages
  try {
    const supabase = await createClient()
    const { data: news } = await supabase
      .from("news")
      .select("id, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false })

    const newsPages: MetadataRoute.Sitemap = (news || []).map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [...staticPages, ...newsPages]
  } catch (error) {
    console.error("[v0] Error generating sitemap:", error)
    return staticPages
  }
}

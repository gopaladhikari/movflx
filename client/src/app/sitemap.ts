import { site } from "@/config/site";
import { getMovies } from "@/lib/movies";
import { MetadataRoute } from "next";

const staticSitemap = [
	{
		url: site.url,
		lastModified: new Date(),
		priority: 1,
	},
	{
		url: `${site.url}/movies`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/embedded-movies`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/login`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/register`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/google/sucess`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/me`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/request-forgot-password`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/reset-forgot-password`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/auth/verify`,
		lastModified: new Date(),
	},
	{
		url: `${site.url}/contact`,
		lastModified: new Date(),
	},
];

export default async function generateSitemaps(): Promise<MetadataRoute.Sitemap> {
	const res = await getMovies(0, 50000);

	if (!res) return staticSitemap;

	const movies = res?.movies.map((movie) => ({
		url: `${site.url}/movies/${movie._id}`,
		lastModified: new Date(),
	}));

	return [...staticSitemap, ...movies];
}

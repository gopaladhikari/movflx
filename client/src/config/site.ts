import {
  // Home,
  Clock,
  ThumbsUp,
} from "lucide-react";

export const site = {
  name: "Movflx - Online Movies & Tv Shows",
  description:
    "MovFlx: Your ultimate destination for movie discovery, reviews, and trailers.",
  url: "https://movflx-eight.vercel.app",
  mainNav: [
    {
      id: 1,
      title: "Home",
      href: "/",
    },
    {
      id: 2,
      title: "Movies",
      href: "/movies?page=1",
    },

    {
      id: 3,
      title: "Theaters",
      href: "/theaters",
    },
    {
      id: 4,
      title: "Pricing",
      href: "/pricing",
    },
    {
      id: 5,
      title: "Contact",
      href: "/contact",
    },
  ],

  footerNav: [
    {
      id: 1,
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      id: 2,
      title: "Terms of Use",
      href: "/terms-of-use",
    },
    {
      id: 3,
      title: "Legal Notice",
      href: "/legal-notices",
    },
  ],

  userNav: [
    // {
    // 	id: 1,
    // 	title: "Home",
    // 	href: "/",
    // 	Icon: Home,
    // },
    {
      id: 2,
      title: "Watchlist",
      href: "/me/watchlist",
      Icon: Clock,
    },
    {
      id: 3,
      title: "Liked videos",
      href: "/me/liked-videos",
      Icon: ThumbsUp,
    },
  ],
};

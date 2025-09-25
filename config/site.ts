/* eslint-disable prettier/prettier */
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TaxSim 2425",
  description:
    "it is taxsim 2425 is tax simulation and hot to apply for tax gauid .",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tax-Simulation",
      href: "/Tax-Simulation",
    },
    {
      label: "Tax-Rules",
      href: "/Tax-Rules",
    },
    {
      label: "How to apply",
      href: "/How-to-apply",
    },
    {
      label: " AI-Suggestions",
      href: "/AI-Suggestions",
    },
    {
      label: "Advanced calculator",
      href: "/Advanced-calculator",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "https://nextui.org",
    discord: "https://discord.gg",
    sponsor: "https://patreon.com",
  },
};

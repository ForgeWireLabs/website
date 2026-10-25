const isPreview = process.env.FORGEWIRE_PREVIEW === "1";

export default {
  name: "ForgeWire Labs",
  url: isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com",
  basePath: isPreview ? "/website" : "",
  preview: isPreview,
  assetVersion: "20261025-organization-first",
  description: "Independent software engineering and research across intelligent systems, distributed computing, developer infrastructure, systems integration, and applied technical education.",
  navigation: [
    { label: "Home", url: "/" },
    { label: "Our Work", url: "/work/" },
    { label: "Research & Engineering", url: "/engineering/" },
    { label: "Software", url: "/projects/" },
    { label: "About", url: "/about/" },
  ],
  socialImage: "/assets/forgewire-labs-social.png",
  github: "https://github.com/ForgeWireLabs",
};

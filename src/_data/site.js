const isPreview = process.env.FORGEWIRE_PREVIEW === "1";

export default {
  name: "ForgeWire Labs",
  url: isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com",
  basePath: isPreview ? "/website" : "",
  preview: isPreview,
  assetVersion: "20261027-mobile-full-slides-1",
  description: "We build intelligent systems, distributed execution infrastructure, repository tools, communications software, and technical learning applications. Systems first. Models second.",
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

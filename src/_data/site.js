const isPreview = process.env.FORGEWIRE_PREVIEW === "1";

export default {
  name: "ForgeWire Labs",
  url: isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com",
  basePath: isPreview ? "/website" : "",
  preview: isPreview,
  assetVersion: "20261025-engineering",
  description: "Independent engineering for distributed computing, agent systems, developer infrastructure, and practical software.",
  navigation: [
    { label: "Projects", url: "/projects/" },
    { label: "Engineering", url: "/engineering/" },
    { label: "About", url: "/about/" },
  ],
  socialImage: "/assets/forgewire-labs-social.png",
  github: "https://github.com/ForgeWireLabs",
};

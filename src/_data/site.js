const isPreview = process.env.FORGEWIRE_PREVIEW === "1";

export default {
  name: "ForgeWire Labs",
  url: isPreview ? "https://forgewirelabs.github.io" : "https://forgewirelabs.com",
  basePath: isPreview ? "/website" : "",
  preview: isPreview,
  description: "Independent engineering and applied AI. Practical software for governed work, planning, communication, and structured learning.",
  navigation: [
    { label: "Projects", url: "/projects/" },
    { label: "Engineering", url: "/engineering/" },
    { label: "About", url: "/about/" },
  ],
  socialImage: "/assets/forgewire-labs-hero.png",
  github: "https://github.com/ForgeWireLabs",
};

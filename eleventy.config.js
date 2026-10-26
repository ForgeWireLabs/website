export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  if (process.env.FORGEWIRE_PREVIEW !== "1") {
    eleventyConfig.addPassthroughCopy({ "src/.htaccess": ".htaccess" });
  }

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: process.env.FORGEWIRE_PREVIEW === "1" ? "_preview" : "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

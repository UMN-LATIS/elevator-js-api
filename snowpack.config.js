/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    example: "/",
    src: "/src",
  },
  packageOptions: {
    polyfillNode: true,
  }
};

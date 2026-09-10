// Turbopack resolves font imports to their hashed build URL; TypeScript needs
// to be told the module shape. Used by the preload links in the root layout.
declare module "*.woff2" {
  const src: string;
  export default src;
}

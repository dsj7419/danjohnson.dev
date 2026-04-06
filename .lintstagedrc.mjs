const config = {
  '*.{ts,tsx,mjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md,mdx}': ['prettier --write'],
}

export default config

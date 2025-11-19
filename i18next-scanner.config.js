module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: './locales',
  options: {
    removeUnusedKeys: false, 
    sort: true,             
  },
};
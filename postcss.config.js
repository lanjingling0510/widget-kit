module.exports = ctx => {
    return {
      plugins: [
        require('postcss-import')(),
        require('postcss-cssnext')(),
        require('postcss-nested')()
      ]
    };
  };
  
const path = require('path');
const isHeroku = require('is-heroku');

const modifyBuilder = require('razzle-plugin-pwa').default;

const pwaConfig = {
  swDest: 'sw.js',
}

const manifestConfig = {
  filename: 'manifest.json',
  name: 'Razzle App',
  short_name: 'Razzle',
  description: 'Another Razzle App',
  orientation: 'portrait',
  display: 'fullscreen',
  start_url: '.',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  related_applications: [],
  icons: []
}

const modify = modifyBuilder({ pwaConfig, manifestConfig })

module.exports = {
  plugins: [
    'manifest',
    'scss',
    { func: modify }
  ],
  modify: (baseConfig, { target, dev }, webpack) => {
    /* make a copy of config */
    const config = { ...baseConfig };

    config.resolve.alias = {
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      assets: path.resolve(__dirname, 'src/assets'),
      styles: path.resolve(__dirname, 'src/styles'),
      stores: path.resolve(__dirname, 'src/stores'),
      services: path.resolve(__dirname, 'src/services'),
      pages: path.resolve(__dirname, 'src/pages'),
    };

    const isDefinePlugin = (plugin) => plugin.constructor.name === 'DefinePlugin';
    const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin);

    if (indexDefinePlugin < 0) {
      console.warn("Couldn't setup razzle-heroku, no DefinePlugin...");
      return config;
    }

    const { definitions } = config.plugins[indexDefinePlugin];
    const newDefs = { ...definitions };

    if (isHeroku) {
      delete newDefs['process.env.PORT'];
      newDefs['process.env.RAZZLE_PUBLIC_DIR'] = '"/app/build/public"';
    }

    config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs);

    return config;
  },
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
                (plugin) => plugin instanceof MiniCssExtractPlugin,
            );

            if (env === 'production') {
                instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
            }

            return webpackConfig;
        },
    }
}
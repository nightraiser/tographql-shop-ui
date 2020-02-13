const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports =  override(fixBabelImports('import', {
	libraryName: 'antd',
	libraryDirectory: 'es',
	style: true,
}),
addLessLoader({
	javascriptEnabled: true,
	modifyVars: {  '@primary-color': '#f5b828' },
	localIdentName: "[local]--[hash:base64:5]"
}),
addWebpackAlias({
    '@assets': path.join(__dirname, 'src/assets'),
    '@constants': path.join(__dirname, 'src/constants'),
    '@components': path.join(__dirname, 'src/components'),
    '@icons': path.join(__dirname, 'src/icons'),
    '@layout': path.join(__dirname, 'src/layout'),
	'@utils': path.join(__dirname, 'src/utils'),
	'@interfaces': path.join(__dirname, 'src/interfaces'),
	'@views': path.join(__dirname, 'src/views')
  }),
);
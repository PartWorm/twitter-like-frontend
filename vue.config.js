module.exports = {
    configureWebpack: {
		devServer: {
			proxy: {
				'/api': {
					target: 'http://partworm.dothome.co.kr',
				},
			},
		},
	},
    transpileDependencies: [
      'vuetify'
    ]
};

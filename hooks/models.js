/*!
 * clout-parse
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const
	debug = require('debug')('clout-parse:hooks/models'),
	parse = require('parse-server').ParseServer,
	path = require('path'),
	fs = require('fs');

module.exports = {
	parse: {
		event: 'start',
		priority: 'MODEL',
		fn: function (next) {
			var conf = this.config.parse,
				path: conf.path,
				endpoint: conf.endpoint;

			// set cloud path
			conf.cloud = path.join(this.rootDirectory, conf.path);
			if (!fs.existsSync(conf.cloud);) {
				debug('Application not found at %s', conf.cloud);
				this.logger.warn('Application not found at %s', conf.cloud)
				return next();
			}

			/*
			 * process configuration
			 */
			if (conf.uri === '<mongodb://localhost/myapp>') {
				debug('Configuration for clout-parse missing');
				this.logger.warn('Configuration `mongo-db uri` for clout-parse missing');
				return next();
			}
			if (conf.appId === '<app-id>') {
				debug('Configuration for clout-parse missing');
				this.logger.warn('Configuration `appId` for clout-parse missing');
				return next();
			}
			if (conf.masterKey === '<master-key>') {
				debug('Configuration `masterKey` for clout-parse missing');
				this.logger.warn('Configuration for clout-parse missing');
				return next();
			}
			if (conf.liveQuery.className === '<array>') {
				debug('Configuration `liveQuery` for clout-parse missing');
				this.logger.warn('Configuration for clout-parse missing');
			}

			conf.databaseURI = conf.uri;
			['uri', 'path', 'endpoint'].forEach(function (e) { delete conf[e]; });
			debug('conf:', JSON.stringify(conf));
			this.parseServer = new ParseServer(conf);
			this.parse = parse;

			// configure endpoint
			this.app.use(endpoint, this.parseServer);

			debug('parse initialized');
			next();
		}
	}
};

'use strict';

const request = require('request').defaults({ 'json': true, 'baseUrl': 'https://steamcommunity.com/' });

const getPem = require('rsa-pem-from-mod-exp');
const RSA = require('node-rsa');

class SteamUser {

	/**
	 * Authorize as a given user at steam and do HTTP-Request as said user
	 *
	 * @class
	 * 
	 * @example
	 * const user = new SteamUser('username');
	 * 
	 * user.login('password')
	 *     .then(console.log)
	 *     .catch(console.error);
	 *
	 * @param      {String}  username  The username
	 * @param      {Object}  jar       Optional cookie jar
	 */
	constructor(username, jar) {
		this.jar = jar || request.jar();

		/**
		 * Make HTTP-requests as this user
		 *
		 * @name SteamUser#request
		 * @see https://www.npmjs.com/package/request
		 */
		this.request = request.defaults({ 'jar': this.jar });

		this.username = username;
	}

	/**
	 * Login to steam
	 *
	 * @param      {String}   password  The password
	 * @param      {Object}   options   Custom data in the POST body
	 * @return     {Promise}  Resolves on successful login
	 */
	login(password, options) {
		return new Promise((resolve, reject) => {

			SteamUser.getAuthData(this.username, password, this.jar).then(auth => {
				let data = Object.assign(auth, options);

				data.twofactorcode = '';
                data.emaildata = '';
                data.loginfriendlyname = '';
                data.captchagid = '-1';
                data.captcha_text = '';
                data.emailsteamid = '';
                data.rememberLogin = true;

				this.request.post('login/dologin', (err, res, body) => 
					body.success ? resolve(body) : reject(err || body) ).form(data);
			}).catch(reject);
		});
	}

	/**
	 * Logout from steam
	 *
	 * @return     {Promise}  Resolves on successful logout, rejects otherwise
	 */
	logout() {
		return new Promise((resolve, reject) => 
			this.request.post('login/logout', (err, res, body) =>
				res.statusCode === 200 ? resolve(body) : reject(err || body) ) );
	}

	/**
	 * Retrieve the public RSA key for the user and resolve the username,
	 * encrypted password and rsa-timestamp
	 *
	 * @static
	 *
	 * @param      {String}   username  The username
	 * @param      {String}   password  The password
	 * @param      {Object}   jar       The optional cookiejar to use with
	 *                                  request
	 * @return     {Promise}  Resolves on a successful HTTP-Response
	 */
	static getAuthData(username, password, jar) {
		return new Promise((resolve, reject) => {

			request.post({ 
				'url': 'login/getrsakey',
				jar 
			}, (err, res, body) => {
				if(body.success) {
					let mod = new Buffer(body.publickey_mod, 'hex'),
						exp = new Buffer(body.publickey_exp, 'hex'),
						pem = getPem(mod, exp),
						key = new RSA(pem, 'pkcs1-public-pem', { 'encryptionScheme': 'pkcs1' });

					resolve({
						username,
						'password': key.encrypt(password, 'base64', 'utf-8'),
						'rsatimestamp': body.timestamp
					});

				} else 
					reject(err || body);
			}).form({ username });
		});
	}
}

module.exports = SteamUser;
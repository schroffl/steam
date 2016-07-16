'use strict';

const SteamUser = require('./user');

const request = require('request').defaults({ 'json': true, 'baseUrl': 'https://steamcommunity.com/' });

function mergeToSingleObject( args ) {
	return Object.assign.apply({ }, [ { } ].concat( Array.from(args) ));
}

/**
 * Gather information from the steamcommunity market.
 *
 * @type       {Object}
 */
const Market = {

	/**
	 * Get price information about a given item
	 * 
	 * @memberof Market
	 *
	 * @example
	 * Market.priceinfo({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })
	 *     .then(console.log) // Logs price info for the CS:GO weapon skin in euros
	 *     .catch(console.error);
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one. Must have property 'currency',
	 *                                'appid' and 'name'
	 * @return     {Promise}  Resolves price information on success
	 */
	'priceinfo': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			request.get({
				'url': '/market/priceoverview',
				'qs': Object.assign({
					'market_hash_name': data.name
				}, data)
			}, (err, res, body) => 
				res.statusCode === 200 ? resolve(body) : reject(err || body) );
		})
	},

	/**
	 * Get all listings for a given item
	 *
	 * @memberof Market
	 *
	 * @example
	 * Market.listings({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })
	 *     .then(console.log)
	 *     .catch(console.error);
	 *
	 * @param      {Object}  obj     Multiple objects that will be merged into one.
	 *                               Must have property 'currency', 'appid' and 'name'
	 *
	 * @return     {Promise}  Resolves on successful HTTP Request
	 */
	'listings': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			request.get({
				'url': `market/listings/${data.appid}/${data.name}/render`,
				'qs': Object.assign({
					'format': 'json'
				}, data)
			}, (err, res, body) => 
				res.statusCode === 200 ? resolve( Object.keys(body.listinginfo).map(key => body.listinginfo[key]) ) : reject(err || body) );
		})
	},

	/**
	 * { function_description }
	 *
	 * @return     {Promise}  { description_of_the_return_value }
	 */
	'buy': function( ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			
		});
	},

	/**
	 * { function_description }
	 *
	 * @return     {Promise}  { description_of_the_return_value }
	 */
	'sell': function( ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {

		});
	},

	/**
	 * Create a Market-Wrapper with the given defaults. Useful e.g. for not
	 * always having to set the currency.
	 *
	 * @example    const euro = Market.defaults({ 'currency': 3 });
	 *
	 * @return     {Object}  Market-Wrapper with the given defaults
	 */
	'defaults': function( ) {
		let data = mergeToSingleObject(arguments),
			copy = Object.assign({ }, Market);

		for(const prop in copy)
			if(typeof copy[prop] === 'function') copy[prop] = copy[prop].bind(copy, data);

		return copy;
	}

};

module.exports = Market.defaults();
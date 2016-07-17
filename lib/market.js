'use strict';

const SteamUser = require('./user');

const request = require('request').defaults({ 'json': true, 'baseUrl': 'https://steamcommunity.com/' });

function mergeToSingleObject( args ) {
	return Object.assign.apply({ }, [ { } ].concat( Array.from(args) ));
}

/**
 * Gather information from the steamcommunity market.
 *
 * @memberof module:steam
 *
 * @type       {Object}
 */
const Market = {

	/**
	 * Get price information about a given item
	 *
	 * @example    
	 * Market.priceinfo({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })
	 *     .then(console.log) // Logs price info for the CS:GO weapon skin in euros
	 *     .catch(console.error);
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one.
	 * @param      {Number}  obj.currency  The currency to use
	 * @param      {Number}  obj.appid     The steam-appid of the application
	 * @param      {String}  obj.name      The name of the item on the market
	 * @return     {Promise}  Resolves price information on success
	 */
	'priceinfo': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			((data.user && data.user.request) || request).get({
				'url': 'market/priceoverview',
				'qs': Object.assign({
					'market_hash_name': data.name
				}, data)
			}, (err, res, body) => 
				res.statusCode === 200 ? resolve(body) : reject(err || body) );
		});
	},

	/**
	 * Get the price history of an item
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one.
	 * @param      {Number}  obj.appid  The steam-appid of the application
	 * @param      {String}  obj.name   The name of the item on the market
	 * @return     {Promise}  Resolves the price history of the item
	 */
	'pricehistory': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			if(!(data.user instanceof SteamUser))
				throw new Error('An authorized SteamUser is to view the price history');

			((data.user && data.user.request) || request).get({
				'url': 'market/pricehistory',
				'qs': Object.assign({
					'market_hash_name': data.name
				}, data)
			}, (err, res, body) =>
				res.statusCode === 200 ? resolve(body) : reject(err || body));
		});
	},

	/**
	 * Get all listings for a given item
	 *
	 * @example    
	 * Market.listings({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })
	 *     .then(console.log)
	 *     .catch(console.error);
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one.
	 * @param      {Number}  obj.currency  The currency to use
	 * @param      {Number}  obj.appid     The steam-appid of the application
	 * @param      {String}  obj.name      The name of the item on the market
	 * @return     {Promise}  Resolves on successful HTTP Request
	 */
	'listings': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			((data.user && data.user.request) || request).get({
				'url': `market/listings/${data.appid}/${data.name}/render`,
				'qs': Object.assign({
					'format': 'json'
				}, data)
			}, (err, res, body) => 
				res.statusCode === 200 ? resolve( Object.keys(body.listinginfo).map(key => body.listinginfo[key]) ) : reject(err || body) );
		})
	},

	/**
	 * Buy an item from the market
	 *
	 * @example    
	 * Market.buy({ 'listingid': 'xxxxxxxx', currency': 3, 'subtotal': 1, 'fee': 2 })
	 * // Buys listing with id 'xxxxxxxx'
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one.
	 * @param      {String|Number}  obj.listingid  The id of the listing on the market
	 * @param      {Number}         obj.currency   The currency to use
	 * @param      {Number}         obj.subtotal   The price of the item (without fee)
	 * @param      {Number}         obj.fee        The fee on the item
	 * @param      {Number}         obj.quantity   The amount of items to buy (Defaults to 1)
	 * @return     {Promise}  Resolves on successful purchase
	 */
	'buy': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			if(!(data.user instanceof SteamUser))
				throw new Error('An authorized SteamUser is required to buy items');

			data.user.request.post({ 
				'url': `market/buylisting/${data.listingid}`,
				'headers': {
					'Referer': 'https://steamcommunity.com/market'
				}
			}, (err, res, body) =>
				res.statusCode === 200 ? resolve(body) : reject(err || body)
			).form( Object.assign({
				'sessionid': data.user.sessionid,
				'total': data.subtotal + data.fee
			}, data) );
		});
	},

	/**
	 * Create a listing for an item on the market
	 *
	 * @example
	 * Market.sell({ user, 'assetid': 'xxxxxxxx', 'price': 1, 'quantity': 1 })
	 * // Lists item 'xxxxxxxx' for 1 (steam specifies no currency either??) on the market
	 *
	 * @param      {Object}   obj     Multiple objects that will be merged into
	 *                                one.
	 * @param      {Number}  obj.appid    The steam-appid of the application
	 * @param      {Number}  obj.assetid  The item id in the inventory of the user
	 * @param      {Number}  obj.price    The amount of money the seller will receive
	 *                                    (without fee)
	 * @param      {Number}  obj.quantity   The amount of items to sell (Defaults to 1)
	 * @return     {Promise}  Resolves on successful creation of the listing
	 */
	'sell': function( obj ) {
		let data = mergeToSingleObject(arguments);

		return new Promise((resolve, reject) => {
			if(!(data.user instanceof SteamUser))
				throw new Error('An authorized SteamUser is required to sell items');

			console.log(data);

			data.user.request.post({
				'url': 'market/sellitem',
				'headers': {
					'Referer': 'https://steamcommunity.com/market'
				}
			}, (err, res, body) =>
				res.statusCode === 200 ? resolve(body) : reject(err || body)
			).form( Object.assign({
				'sessionid': data.user.sessionid,
				'amount': data.quantity || 1
			}, data) );
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
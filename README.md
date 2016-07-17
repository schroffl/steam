# steam

# API Reference

* [steam](#module_steam)
    * [.SteamUser](#module_steam.SteamUser)
        * [new SteamUser(username, jar)](#new_module_steam.SteamUser_new)
        * _instance_
            * [.login(password, options)](#module_steam.SteamUser+login) ⇒ <code>Promise</code>
            * [.logout()](#module_steam.SteamUser+logout) ⇒ <code>Promise</code>
        * _static_
            * [.getAuthData(username, password, jar)](#module_steam.SteamUser.getAuthData) ⇒ <code>Promise</code>
    * [.Market](#module_steam.Market) : <code>Object</code>
        * [.priceinfo(obj)](#module_steam.Market.priceinfo) ⇒ <code>Promise</code>
        * [.pricehistory(obj)](#module_steam.Market.pricehistory) ⇒ <code>Promise</code>
        * [.listings(obj)](#module_steam.Market.listings) ⇒ <code>Promise</code>
        * [.buy(obj)](#module_steam.Market.buy) ⇒ <code>Promise</code>
        * [.sell(obj)](#module_steam.Market.sell) ⇒ <code>Promise</code>
        * [.defaults()](#module_steam.Market.defaults) ⇒ <code>Object</code>

<a name="module_steam.SteamUser"></a>

### steam.SteamUser
Authorize at steam

**Kind**: static class of <code>[steam](#module_steam)</code>  

* [.SteamUser](#module_steam.SteamUser)
    * [new SteamUser(username, jar)](#new_module_steam.SteamUser_new)
    * _instance_
        * [.login(password, options)](#module_steam.SteamUser+login) ⇒ <code>Promise</code>
        * [.logout()](#module_steam.SteamUser+logout) ⇒ <code>Promise</code>
    * _static_
        * [.getAuthData(username, password, jar)](#module_steam.SteamUser.getAuthData) ⇒ <code>Promise</code>

<a name="new_module_steam.SteamUser_new"></a>

#### new SteamUser(username, jar)

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username |
| jar | <code>Object</code> | Optional cookie jar |

**Example**  
```js
const user = new SteamUser('username');
```
<a name="module_steam.SteamUser+login"></a>

#### steamUser.login(password, options) ⇒ <code>Promise</code>
Login to steam

**Kind**: instance method of <code>[SteamUser](#module_steam.SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on successful login  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | The password |
| options | <code>Object</code> | Custom data in the POST body |

**Example**  
```js
user.login('password');
```
<a name="module_steam.SteamUser+logout"></a>

#### steamUser.logout() ⇒ <code>Promise</code>
Logout from steam

**Kind**: instance method of <code>[SteamUser](#module_steam.SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on successful logout, rejects otherwise  
<a name="module_steam.SteamUser.getAuthData"></a>

#### SteamUser.getAuthData(username, password, jar) ⇒ <code>Promise</code>
Retrieve the public RSA key for the user and resolve the username,encrypted password and rsa-timestamp

**Kind**: static method of <code>[SteamUser](#module_steam.SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on a successful HTTP-Response  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username |
| password | <code>String</code> | The password |
| jar | <code>Object</code> | The optional cookiejar to use with                                  request |

<a name="module_steam.Market"></a>

### steam.Market : <code>Object</code>
Gather information from the steamcommunity market.

**Kind**: static constant of <code>[steam](#module_steam)</code>  

* [.Market](#module_steam.Market) : <code>Object</code>
    * [.priceinfo(obj)](#module_steam.Market.priceinfo) ⇒ <code>Promise</code>
    * [.pricehistory(obj)](#module_steam.Market.pricehistory) ⇒ <code>Promise</code>
    * [.listings(obj)](#module_steam.Market.listings) ⇒ <code>Promise</code>
    * [.buy(obj)](#module_steam.Market.buy) ⇒ <code>Promise</code>
    * [.sell(obj)](#module_steam.Market.sell) ⇒ <code>Promise</code>
    * [.defaults()](#module_steam.Market.defaults) ⇒ <code>Object</code>

<a name="module_steam.Market.priceinfo"></a>

#### Market.priceinfo(obj) ⇒ <code>Promise</code>
Get price information about a given item

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Promise</code> - Resolves price information on success  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. |
| obj.currency | <code>Number</code> | The currency to use |
| obj.appid | <code>Number</code> | The steam-appid of the application |
| obj.name | <code>String</code> | The name of the item on the market |

**Example**  
```js
Market.priceinfo({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })    .then(console.log) // Logs price info for the CS:GO weapon skin in euros    .catch(console.error);
```
<a name="module_steam.Market.pricehistory"></a>

#### Market.pricehistory(obj) ⇒ <code>Promise</code>
Get the price history of an item

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Promise</code> - Resolves the price history of the item  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. |
| obj.appid | <code>Number</code> | The steam-appid of the application |
| obj.name | <code>String</code> | The name of the item on the market |

<a name="module_steam.Market.listings"></a>

#### Market.listings(obj) ⇒ <code>Promise</code>
Get all listings for a given item

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Promise</code> - Resolves on successful HTTP Request  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. |
| obj.currency | <code>Number</code> | The currency to use |
| obj.appid | <code>Number</code> | The steam-appid of the application |
| obj.name | <code>String</code> | The name of the item on the market |

**Example**  
```js
Market.listings({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })    .then(console.log)    .catch(console.error);
```
<a name="module_steam.Market.buy"></a>

#### Market.buy(obj) ⇒ <code>Promise</code>
Buy an item from the market

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Promise</code> - Resolves on successful purchase  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. |
| obj.listingid | <code>String</code> &#124; <code>Number</code> | The id of the listing on the market |
| obj.currency | <code>Number</code> | The currency to use |
| obj.subtotal | <code>Number</code> | The price of the item (without fee) |
| obj.fee | <code>Number</code> | The fee on the item |
| obj.quantity | <code>Number</code> | The amount of items to buy (Defaults to 1) |

**Example**  
```js
Market.buy({ 'listingid': 'xxxxxxxx', 'currency': 3, 'subtotal': 1, 'fee': 2 })// Buys listing with id 'xxxxxxxx'
```
<a name="module_steam.Market.sell"></a>

#### Market.sell(obj) ⇒ <code>Promise</code>
Create a listing for an item on the market

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Promise</code> - Resolves on successful creation of the listing  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. |
| obj.appid | <code>Number</code> | The steam-appid of the application |
| obj.assetid | <code>Number</code> | The item id in the inventory of the user |
| obj.price | <code>Number</code> | The amount of money the seller will receive                                    (without fee) |
| obj.quantity | <code>Number</code> | The amount of items to sell (Defaults to 1) |

**Example**  
```js
Market.sell({ user, 'assetid': 'xxxxxxxx', 'price': 1, 'quantity': 1 })// Lists item 'xxxxxxxx' for 1 (steam specifies no currency either??) on the market
```
<a name="module_steam.Market.defaults"></a>

#### Market.defaults() ⇒ <code>Object</code>
Create a Market-Wrapper with the given defaults. Useful e.g. for notalways having to set the currency.

**Kind**: static method of <code>[Market](#module_steam.Market)</code>  
**Returns**: <code>Object</code> - Market-Wrapper with the given defaults  
**Example**  
```js
const euro = Market.defaults({ 'currency': 3 });
```

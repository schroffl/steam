## Classes

<dl>
<dt><a href="#SteamUser">SteamUser</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#Market">Market</a> : <code>Object</code></dt>
<dd><p>Gather information from the steamcommunity market.</p>
</dd>
</dl>

<a name="SteamUser"></a>

## SteamUser
**Kind**: global class  

* [SteamUser](#SteamUser)
    * [new SteamUser(username, jar)](#new_SteamUser_new)
    * _instance_
        * [.request](#SteamUser+request)
        * [.login(password, options)](#SteamUser+login) ⇒ <code>Promise</code>
        * [.logout()](#SteamUser+logout) ⇒ <code>Promise</code>
    * _static_
        * [.getAuthData(username, password, jar)](#SteamUser.getAuthData) ⇒ <code>Promise</code>

<a name="new_SteamUser_new"></a>

### new SteamUser(username, jar)
Authorize as a given user at steam and do HTTP-Request as said user


| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username |
| jar | <code>Object</code> | Optional cookie jar |

**Example**  
```js
const user = new SteamUser('username');user.login('password')    .then(console.log)    .catch(console.error);
```
<a name="SteamUser+request"></a>

### steamUser.request
Make HTTP-requests as this user

**Kind**: instance property of <code>[SteamUser](#SteamUser)</code>  
**See**: https://www.npmjs.com/package/request  
<a name="SteamUser+login"></a>

### steamUser.login(password, options) ⇒ <code>Promise</code>
Login to steam

**Kind**: instance method of <code>[SteamUser](#SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on successful login  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | The password |
| options | <code>Object</code> | Custom data in the POST body |

<a name="SteamUser+logout"></a>

### steamUser.logout() ⇒ <code>Promise</code>
Logout from steam

**Kind**: instance method of <code>[SteamUser](#SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on successful logout, rejects otherwise  
<a name="SteamUser.getAuthData"></a>

### SteamUser.getAuthData(username, password, jar) ⇒ <code>Promise</code>
Retrieve the public RSA key for the user and resolve the username,encrypted password and rsa-timestamp

**Kind**: static method of <code>[SteamUser](#SteamUser)</code>  
**Returns**: <code>Promise</code> - Resolves on a successful HTTP-Response  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username |
| password | <code>String</code> | The password |
| jar | <code>Object</code> | The optional cookiejar to use with                                  request |

<a name="Market"></a>

## Market : <code>Object</code>
Gather information from the steamcommunity market.

**Kind**: global constant  

* [Market](#Market) : <code>Object</code>
    * [.priceinfo(obj)](#Market.priceinfo) ⇒ <code>Promise</code>
    * [.listings(obj)](#Market.listings) ⇒ <code>Promise</code>
    * [.buy()](#Market.buy) ⇒ <code>Promise</code>
    * [.sell()](#Market.sell) ⇒ <code>Promise</code>
    * [.defaults()](#Market.defaults) ⇒ <code>Object</code>

<a name="Market.priceinfo"></a>

### Market.priceinfo(obj) ⇒ <code>Promise</code>
Get price information about a given item

**Kind**: static method of <code>[Market](#Market)</code>  
**Returns**: <code>Promise</code> - Resolves price information on success  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into                                one. Must have property 'currency',                                'appid' and 'name' |

**Example**  
```js
Market.priceinfo({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })    .then(console.log) // Logs price info for the CS:GO weapon skin in euros    .catch(console.error);
```
<a name="Market.listings"></a>

### Market.listings(obj) ⇒ <code>Promise</code>
Get all listings for a given item

**Kind**: static method of <code>[Market](#Market)</code>  
**Returns**: <code>Promise</code> - Resolves on successful HTTP Request  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Multiple objects that will be merged into one.                               Must have property 'currency', 'appid' and 'name' |

**Example**  
```js
Market.listings({ 'currency': 3, 'appid': 730, 'name': 'AK-47 | Redline (Well-Worn)' })    .then(console.log)    .catch(console.error);
```
<a name="Market.buy"></a>

### Market.buy() ⇒ <code>Promise</code>
{ function_description }

**Kind**: static method of <code>[Market](#Market)</code>  
**Returns**: <code>Promise</code> - { description_of_the_return_value }  
<a name="Market.sell"></a>

### Market.sell() ⇒ <code>Promise</code>
{ function_description }

**Kind**: static method of <code>[Market](#Market)</code>  
**Returns**: <code>Promise</code> - { description_of_the_return_value }  
<a name="Market.defaults"></a>

### Market.defaults() ⇒ <code>Object</code>
Create a Market-Wrapper with the given defaults. Useful e.g. for notalways having to set the currency.

**Kind**: static method of <code>[Market](#Market)</code>  
**Returns**: <code>Object</code> - Market-Wrapper with the given defaults  
**Example**  
```js
const euro = Market.defaults({ 'currency': 3 });
```

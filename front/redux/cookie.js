
let cookie = {}

  

var decode = decodeURIComponent;
var encode = encodeURIComponent;

cookie.parse = function(str, options) {
  var obj = {}
  var opt = options || {};
  var pairs = str.split(/; */);
  var dec = opt.decode || decode;

  pairs.forEach(function(pair) {
    var eq_idx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      return;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  });

  return obj;
}


cookie.serialize = function(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  var pairs = [name + '=' + enc(val)];

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    pairs.push('Max-Age=' + maxAge);
  }

  if (opt.domain) pairs.push('Domain=' + opt.domain);
  if (opt.path) pairs.push('Path=' + opt.path);
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');

  return pairs.join('; ');
}

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


var _rawCookies = {};
var _cookies = {};

if (typeof document !== 'undefined') {
  setRawCookie(document.cookie);
}

function load(name, doNotParse) {
  if (doNotParse) {
    return _rawCookies[name];
  }

  return _cookies[name];
}

function save(name, val, opt) {
  _cookies[name] = val;
  _rawCookies[name] = val;

  // allow you to work with cookies as objects.
  if (typeof val === 'object') {
    _rawCookies[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, _rawCookies[name], opt);
  }
}

function remove(name) {
  delete _rawCookies[name];
  delete _cookies[name];

  if (typeof document !== 'undefined') {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

function setRawCookie(rawCookie) {
  _rawCookies = {};
  _cookies = {};

  if (!rawCookie) {
    return;
  }

  var rawCookies = cookie.parse(rawCookie);

  for (var key in rawCookies) {
    _rawCookies[key] = rawCookies[key];

    try {
      _cookies[key] = JSON.parse(rawCookies[key]);
    } catch(e) {
      // Not serialized object
      _cookies[key] = rawCookies[key];
    }
  }
}

var Cookie = {
  load: load,
  save: save,
  remove: remove,
  setRawCookie: setRawCookie
};


export default Cookie;
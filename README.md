# egg-session-mongoose

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-session-mongoose.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-session-mongoose
[download-image]: https://img.shields.io/npm/dm/egg-session-mongoose.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-session-mongoose

A session extension for store session in MongoDB.

## Install


```bash
$ npm i egg-session-mongoose --save
```

## Usage

This module dependent on [egg-mongoose] plugin, so we must enable both.

```js
// {app_root}/config/plugin.js
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.sessionMongoose = {
  enable: true,
  package: 'egg-session-mongoose',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.sessionMongoose = {
  name:'Session'
};
```

## LINK

[Questions](https://github.com/woodensail/egg-session-mongoose/issues)

[Github](https://github.com/woodensail/egg-session-mongoose)

## License

[ISC](LICENSE)

[egg-mongoose]: https://github.com/eggjs/egg-mongoose

# PostCSS Unify [![Build Status][ci-img]][ci]

[PostCSS] plugin keep same ratio on different screen size by vw.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/comwang/postcss-unify.svg
[ci]:      https://travis-ci.org/comwang/postcss-unify

```css
<!-- before -->
.foo {
    width:75;  /* default design size is 750px*/
    height:20px;
}
```

```css
<!-- after -->
.foo {
  width:10vw;
  height:20px;
}
```

## Usage
``` bash
$ cd myProject
$ git clone git@github.com:comWang/postcss-unify.git
$ npm install
```
For webpack:
```javascript
// postcss.config.js
module.exports = {
    plugins: [
        require('./postcss-unify')({ size: 750 }),
    ],
};
```

(`size: number`) Design draft width.

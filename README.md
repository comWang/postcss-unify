# [PostCSS] Unify [![Build Status][ci-img]][ci]

[PostCSS] 换算为等长的以 vw 为单位的尺寸

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/comwang/postcss-unify.svg
[ci]: https://travis-ci.org/comwang/postcss-unify

## Install

### From github

```bash
$ cd path-to-your-project
$ git clone https://github.com/comWang/postcss-unify.git
$ cd postcss-unify && npm link
$ cd ../ && npm link postcss-unify
```
如果是在powershell下使用，请将 `&&` 替换为 `;`。

## Usage

### For vue-cli

```javascript
// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                ident: 'postcss',
                plugins: () => [
                    require('autoprefixer')({}),
                    // change to your deviceWidth. 700, 1080, 1920 etc.
                    require('postcss-unify')({ deviceWidth: 700 })
                ]
            }
        }
    }
};
```

### For webpack

```javascript
// webpack.config.js
module.exports = {
    module: {
        rules: {
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                              require('autoprefixer')({}),
                              // change to your deviceWidth. 700, 1080, 1920 etc.
                              require('postcss-unify')({deviceWidth: 700})
                            ]
                        }
                    }
                ]
            }
        }
    }
}
```

通常情况下你应将`deviceWidth`改为你所参照的设计稿宽度。一般而言，设计师会以设备的物理像素为基准作图。例如屏幕像素为 350px，设备的[devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)为 2，设计稿通常会是 700px，这也是 postcss-unify 的默认值。

## Translate

### before

```css
.foo {
    width: 70;
    height: 20px;
    padding: 10 20 30px 0;
    font-size: 16;
}
```

### after

```css
.foo {
    width: 10vw;
    height: 20px;
    padding: 1.42857vw 2.85714vw 30px 0;
    font-size: 2.28571vw;
}
```

还可以在选项中配置 test, include, exclude 字段指定/排除某些文件，不过这时需要传递额外的[context](https://www.npmjs.com/package/postcss-loader)参数。

```javascript
// ignore others...
plugins: (context) => [
    require('postcss-unify')({
        context,
        deviceWidth: 700,
        // like webpack rules
        exclude: 'node_modules'
    })
];
```

开始使用吧！🥰

## Resource

[Writing Your First PostCSS Plugin](https://dockyard.com/blog/2018/02/01/writing-your-first-postcss-plugin)

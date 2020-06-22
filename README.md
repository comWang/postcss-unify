# PostCSS Unify [![Build Status][ci-img]][ci]

[PostCSS] 换算为等长的以vw为单位的尺寸

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/comwang/postcss-unify.svg
[ci]:      https://travis-ci.org/comwang/postcss-unify

## Install
### From github
``` bash
$ cd path-to-your-project
$ git clone https://github.com/comWang/postcss-unify.git
$ cd postcss-unify && npm link
$ cd ../ && npm link postcss-unify
```
## Usage
### For vue-cli
``` javascript
// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          ident: 'postcss',
          plugins: () => [
            // change to your deviceWidth. 700, 1080, 1920 etc.
            require('postcss-unify')({deviceWidth: 700})
          ]
        }
      }
    }
}
```

### For webpack
``` javascript
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
这里的`deviceWidth`指的是屏幕宽度（以物理像素计算）。例如浏览器查看宽度为350px,设备的`devicePixelRatio`为2，那么这里`deviceWidth`等于700，这也是postcss-unify的默认值。通常情况下你应将该值设为设计稿宽度的标注尺寸。
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
## Notice
【1.0.0】诸如`border-radius: 1 solid #ff00aa`这样混用尺寸与非尺寸属性的不会生效，你可以用下面的方式代替：
``` css
border-width: 1;
border-style: solid;
border-color: #ff00aa;
```
开始使用吧！
## Resource
[Writing Your First PostCSS Plugin](https://dockyard.com/blog/2018/02/01/writing-your-first-postcss-plugin)
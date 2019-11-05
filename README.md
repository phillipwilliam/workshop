## Webpack

You can use any other module bundler ([Rollup](https://rollupjs.org/guide/en/), [Parcel](https://parceljs.org/), [Gulp](https://gulpjs.com/)).

We want to include a module bundler to handle;
- ES Modules
- transforms or polyfill syntax (i.e. es6, jsx, Promise)
- minification
- bunch of other things. You can read more [here](https://webpack.js.org/)

#### 1. Create a package.json file 

`npm init -y`

#### 2. Install webpack and webpack-cli

`npm install webpack webpack-cli`

#### 3. Install babel configuration

`npm install --save-dev @babel/core @babel/cli babel-loader @babel/preset-react`

#### 4. Move the script into `src/index.js` and update the reference in index.html

#### 5. Create a `webpack.config.js` in the root directory

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                include: /src/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        '@babel/preset-react'
                    ]
                  }
                }
              }
        ]
    }
  }; 
```

#### 6. Run webpack

`npx webpack --config webpack.config.js`

`npx webpack --config webpack.config.js --watch`

#### 7. Add script to package.json

`"server": "npx webpack --config webpack.config.js --watch"`

#### 8. Include React & React DOM as a npm package

`npm install react react-dom`

Import both dependencies in the script file and remove the CDN reference

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
```

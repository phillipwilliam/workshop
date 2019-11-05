## webpack-dev-server

You'll first need to install `webpack-dev-server` and `html-webpack-plugin`.

```
npm install --save-dev webpack-dev-server html-webpack-plugin
```

**webpack.config.js**
```
const HtmlWebPackPlugin = require('html-webpack-plugin');

devServer: {
    contentBase: path.join(__dirname, '/dist'),
    hot: true
}
...
plugins: [
    new HtmlWebPackPlugin({
        template: process.cwd() + '/src/index.html',
        filename: 'index.html'
    })
]
```

Remove the *base.css* from `index.html` and add it to `src/index.js`

**src/index.js**

```
import './css/base.css';
```


Start the server

```
npx webpack-dev-server --config webpack.config.js
```

Next: [CSS (Extract)](http://url.com)
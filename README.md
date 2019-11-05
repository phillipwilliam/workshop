## CSS - Extract

There are 2 main flavours for adding styles to an app:
- Referencing an external style sheet - This can either be a <link> tag added to the html or injected by Webpack
- Inline styles ([styled-components](https://www.styled-components.com/), [JSS](https://cssinjs.org/?v=v10.0.0))

This is an example of extracting the styles into a css file.

You'll need to install `css-loader` and `mini-css-extract-plugin`.

```
npm install --save-dev css-loader mini-css-extract-plugin
```

Update the webpack config file and including the new package reference.

**webpack.config.js**

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

{
    test: /\.(css)$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
    ]
}
...
plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
]
```

Run the application

```
npm start
```

The webpack bundle should now contain a `bundle.css` file.
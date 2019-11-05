## CSS - Inline

There are 2 main flavours for adding styles to an app:
- Referencing an external style sheet - This can either be a <link> tag added to the html or injected by Webpack
- Inline styles ([styled-components](https://www.styled-components.com/), [JSS](https://cssinjs.org/?v=v10.0.0))

This is a basic example of splitting styles per component. If you prefer your *production* build to
reference an external style sheet, this would be the ideal setup for *development*.

You'll need to install `css-loader` and `style-loader`.
Webpack will not know how to load the styles without including these packages.

```
npm install --save-dev css-loader style-loader
```

**webpack.config.js**

```javascript
{
    test: /\.(css)$/,
    use: [
        'style-loader',
        'css-loader'
    ]
}
```

Run the application

```
npm start
```

Next: [CSS (Extract)](http://url.com)
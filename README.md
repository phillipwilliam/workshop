## React without JSX

> Each JSX element is just syntactic sugar for calling React.createElement(component, props, ...children). So, anything you can do with JSX can also be done with just plain JavaScript.

### React.createElement

``` javascript
const H2 = prop => React.createElement('h2', { className: 'heading' }, prop.children);

ReactDOM.render(
    React.createElement(H2, null, 'Hello world'),
    document.getElementById('root')
);
```

### JSX

``` javascript
const H2 = prop => <h2 className="heading">{prop.children}</h2>;

ReactDOM.render(
    <H2>Hello World</H2>,
    document.getElementById('root')
);
```
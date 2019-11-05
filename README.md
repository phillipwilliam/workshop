## Components and Props

### Split components

Evaluate splitting the content in `src/index.js` into smaller reusable components.

### PropTypes and default props

`npm install --save prop-types`

```javascript
const Heading = ({ title, className }) => (
    <h2 className={className}>{title}</h2>
)

Heading.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

Heading.defaultProps = {
    className: null
}
```
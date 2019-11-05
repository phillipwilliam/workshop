## styled-component

You'll first need to install `styled-components`.

```
npm install --save styled-components
```

Now you can include the library in a component

```javascript
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 100%;
    height: 40px;
    padding: 10px;
`;

const Content = ({ children }) => (
    <StyledDiv>{children}<StyledDiv>
)
```

Run the application

```
npm start
```

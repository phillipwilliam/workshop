## React hooks

Before there were hooks, components requiring it's own state had to be written as class components.
There was no way to keep state of data in a functional component, it took a set of props and just returned a value.
Once of the motivations for introducting state management libraries.

### useState

```javascript
class ToggleClassComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({ toggle: !this.state.toggle });
    }

    render() {
        return (
            <Fragment>
                <button type="button" onClick={this.handleToggle}>
                    {this.state.toggle ? 'Close' : 'Open'}
                </button>
                { this.state.toggle && (
                    <Table />
                ) }
            </Fragment>
        );
    }
}
```

``` javascript
const ToggleFuncComponent = () => {
    const [toggle, setToggle] = React.useState(false);
    return (
        <Fragment>
            <button type="button" onClick={() => setToggle(!toggle)}>
                {toggle ? 'Close' : 'Open'}
            </button>
            { toggle && (
                <Table />
            ) }
        </Fragment>
    )
};
```

### useEffect

``` javascript
const DataList = ({ data, loading, error, getData }) => {
    React.useEffect(() => {
        getData()
    }, []); // Gurantees that getData() is only called once on mount

    if (error) {
        return <Error />
    }

    if (data) {
        return (
            <ul>{ data.map(item => ( <li>{item.name}</li> )) }</ul>
        )
    }

    return <Loading>;
}
```

``` javascript
const DataList = ({ id, data, loading, error, getData }) => {
    React.useEffect(() => {
        getData(id)
    }, [id]); // Requests geData() everytime prop.id changes only

    if (error) {
        return <Error />
    }

    if (data) {
        return (
            <ul>{ data.map(item => ( <li>{item.name}</li> )) }</ul>
        )
    }

    return <Loading>;
}
```

``` javascript
const DataList = ({ searchText }) => {
    const [search, setSearch] = React.useState(searchText);
    React.useEffect(() => {
        setSearch(searchText)
    }, [searchText]); // Overrides the search if prop.searchText is updated

    return (
        <Fragment>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" value={search} onChange={({ target: { value }}) => setSearch(value)} />
            <button type="button">Search</button>
        </Fragment>
    )
}
```

### useRef
``` javascript
const TextInputWithFocusButton = () => {
    const inputEl = React.useRef(null);

    React.useEffect(() => {
        inputEl.current.focus();
    }, []);

    return (
        <Fragment>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" value={search} onChange={({ target: { value }}) => setSearch(value)} />
            <button type="button">Search</button>
        </Fragment>
    );
}
```

### useReducer
``` javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.index]: action.text };
    default:
      throw new Error();
  }
};

const List = () => {
  const [index, setIndex] = React.useState(1);
  const [text, setText] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, {});
  const addList = () => {
    dispatch({ type: 'ADD', index, text });
    setText('');
    setIndex(index + 1);
  };

  return (
    <React.Fragment>
      <ul>
        {
            Object.keys(state).length > 0 && (
                Object.entries(state).map(([index, text]) => (
                    <li key={index}>{text}</li>
                ))
            )
        }
      </ul>

      <hr />

      <input type="text" value={text} onChange={({ target: { value } }) => setText(value)} />
      <button type="button" disabled={!text} onClick={addList}>
        Add
      </button>
    </React.Fragment>
  );
};

```

### useContext

```javascript

const gon = {
  email: 'katie@pwc.com',
  name: 'Katie',
  role: 'Admin'
};

const GonContext = React.createContext();

const Appl = () => {
  return (
    <GonContext.Provider value={gon}>
      <Header />
      <Sidebar />
      <Content />
    </GonContext.Provider>
  );
};

const Header = () => (
  <header>
    <h1>PwC</h1>
    <Profile />
  </header>
);

const Profile = () => {
  const { name } = React.useContext(GonContext);
  return <span>Hi {name}!</span>;
};

const Sidebar = () => (
  <div className="sidebar">
    <Navigation />
  </div>
);

const Navigation = () => {
  const { role } = React.useContext(GonContext);
  return (
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Dashboard</a>
      </li>
      {role === 'Admin' && (
        <li>
          <a href="#">Settings</a>
        </li>
      )}
    </ul>
  );
};

const Content = () => {
  const { name, email, role } = React.useContext(GonContext);
  return (
    <div class="content">
      Name: {name} <br />
      Email: {email}
      <br />
      Role: {role}
    </div>
  );
};

```

Next: [CSS (Extract)](http://url.com)
## Redux

#### The basics

```javascript
function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }

    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

var store = Redux.createStore(counter)

document.getElementById('decrement')
    .addEventListener('click', function () {
        store.dispatch({ type: 'DECREMENT' })
    })
```

```javascript
function* counter() {
    yield 1;
    yield 2;
}

const count = counter();
count.next().value; // 1
count.next().value; // 2

```
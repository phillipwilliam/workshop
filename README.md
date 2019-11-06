## Redux Saga

### Generators
```javascript
function* counter(a) {
    yield a;
    yield a + 10;
    yield a + 20;
    yield a + 30;
    yield a + 40;
}

const count = counter(5);
count.next();
```

```javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  console.log(value);
}
```

### Saga

```javascript
<script src="https://unpkg.com/redux-saga/dist/redux-saga.umd.min.js"></script>
```

#### Create a saga that logs all the ACTIONS

```javascript
// Create a saga middleware
const sagaMiddleware = ReduxSaga.default();

// Get 'take' Effect
const { take } = ReduxSaga.effects;

// Create a generator that will log all ACTIONS
function* watchLogAction() {
    while (true) {
        const action = yield take('*');
        console.log(action);
    }
}

// Include Redux.applyMiddleware(sagaMiddleware) as the third arg
const store = Redux.createStore(counter, 0, Redux.applyMiddleware(sagaMiddleware));

// Register the watchLogAction generator
sagaMiddleware.run(watchLogAction);
```

#### Replace the 'Increment async' dispatch to use the delay(1000) effect instead of setTimeout(() => {}, 1000)

```javascript
const { take, put, delay, takeEvery } = ReduxSaga.effects;

// Create a generator that waits for 1000ms before dispatching "INCREMENT" action
function* delayIncrement(action) {
    yield delay(1000);
    yield put({ type: 'INCREMENT' });
}

// Create a generator that watches for the "INCREMENT_ASYNC" action and calls delayIncrement()
function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', delayIncrement);
}

// Register the watchIncrementAsync generator
sagaMiddleware.run(watchIncrementAsync);

// Update 'incrementAsync' button to dispatch "INCREMENT_ASYNC" action
document.getElementById('incrementAsync')
    .addEventListener('click', function () {
        store.dispatch({ type: 'INCREMENT_ASYNC' });
    })
```

#### Update the example above and replace takeEvery() with takeLatest()

`takeEvery()` will run all the requested tasks while `takeLatest()` will cancel the previous tasks and execute the last task
Click the 'Increment async' button multiple times rapidly and compare the click counter.

``` javascript
const { take, put, delay, takeEvery, takeLatest } = ReduxSaga.effects;

// Compare the click counter with 
function* watchIncrementAsync() {
    yield takeLatest('INCREMENT_ASYNC', delayIncrement);
}
```

#### Throttle the number of times the dispatch task on '+' button should be executed

``` javascript
const { take, put, delay, takeEvery, takeLatest, throttle } = ReduxSaga.effects;

// Create a generator with a 2000ms window between each 'INCREMENT' dispatch
function* watchIncrementThrottled() {
    yield throttle(2000, 'INCREMENT_THROTTLED', function*() {
        yield put({ type: 'INCREMENT' })
    })
}
// Update the button to dispatch INCREMENT_THROTTLED action
document.getElementById('increment')
    .addEventListener('click', function () {
        store.dispatch({ type: 'INCREMENT_THROTTLED' })
    })
```

#### Get the winner of 2 parallel requests with the race() effect
```javascript
const { take, put, call, delay, takeEvery, takeLatest, throttle, race } = ReduxSaga.effects;

// Add mock api that has a 3000ms delay before returning a payload
function* mockApi() {
    yield delay(3000); // Change this delay ms to win
    return { payload: 'data' };
}

// Generator that uses the race() effect. When the winner is returned, the remaining effects are cancelled
function* raceAgainstTime() {
    // 
    const { result, timeout } = yield race({
        result: call(mockApi),
        timeout: delay(2000)
    })

    if (result) {
        yield put({ type: 'REQUEST_COMPLETED', result });
    }

    if (timeout) {
        yield put({ type: 'REQUEST_TIMED_OUT' });
    }
}

// Register the raceAgainstTime generator
sagaMiddleware.run(raceAgainstTime);
```
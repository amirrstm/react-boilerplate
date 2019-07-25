import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
const createHistory = require("history").createBrowserHistory;

import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers";

export const history = createHistory();

function configureStoreProd(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [thunk, reactRouterMiddleware];

    return createStore(
        createRootReducer(history),
        initialState,
        compose(applyMiddleware(...middlewares))
    );
}

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        reactRouterMiddleware
    ];

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            // const nextRootReducer = require("../reducers").default; // eslint-disable-line global-require
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}

const configureStore =
    process.env.NODE_ENV === "production"
        ? configureStoreProd
        : configureStoreDev;

export default configureStore;

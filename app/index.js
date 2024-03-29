/* eslint-disable import/default */
import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore, { history } from "./redux/store/configureStore";

import Root from "./Root";
const store = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById("app")
);

if (module.hot) {
    module.hot.accept("./Root", () => {
        const NewRoot = require("./Root").default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById("app")
        );
    });
}

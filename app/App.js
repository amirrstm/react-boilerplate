import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Form, Field, withFormik } from "./form";

class App extends Component {
    render() {
        return (
            <Form>
                <Field name="username" type="Input" />
                <button type="submit">submit</button>
            </Form>
        );
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        username: ""
    }),
    handleSubmit: values => {
        console.log(values);
    }
})(hot(module)(App));

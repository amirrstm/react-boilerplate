import React from "react";
import PropTypes from "prop-types";

export default function TextInput({ method, ...props }) {
    return <input type={method} {...props} />;
}

TextInput.propTypes = {
    method: PropTypes.string.isRequired
};

TextInput.defaultProps = {
    method: "text"
};

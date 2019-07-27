import React from "react";
import PropTypes from "prop-types";
import { Field as FormikField, ErrorMessage } from "formik";

import Fields from "./fields";

export default function Field({ name, type, ...props }) {
    const Input = Fields[type];

    return (
        <FormikField
            name={name}
            render={({ form, field }) => (
                <>
                    <Input
                        {...field}
                        {...props}
                        form={form}
                        error={
                            form.errors[field.name] && form.touched[field.name]
                        }
                    />
                    <ErrorMessage name={field.name}>
                        {message => <span>{message}</span>}
                    </ErrorMessage>
                </>
            )}
        />
    );
}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

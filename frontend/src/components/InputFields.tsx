import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Field } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import * as Yup from "yup";
import { Fragment } from "react";

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("email is required!"),
  password: Yup.string().required("password is required!"),
});

export const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("first name is required!"),
  lastName: Yup.string().required("last name is required!"),
  email: Yup.string().required("email is required!"),
  password: Yup.string().required("password is required!"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const FirstNameField = () => {
  return (
    <Fragment>
      <Field
        as={TextField}
        type="text"
        name="firstName"
        label="First Name"
        variant="outlined"
        size="small"
        sx={{
          width: 300,
          margin: "0.5rem 3rem",
        }}
      />
      <ErrorMessage name="firstName" component="div" className="error" />
    </Fragment>
  );
};

export const LastNameField = () => {
  return (
    <Fragment>
      <Field
        as={TextField}
        type="text"
        name="lastName"
        label="Last Name"
        variant="outlined"
        size="small"
        sx={{
          width: 300,
          margin: "0.5rem 3rem",
        }}
      />
      <ErrorMessage name="lastName" component="div" className="error" />
    </Fragment>
  );
};

export const EmailField = () => {
  return (
    <Fragment>
      <Field
        as={TextField}
        type="text"
        name="email"
        label="Email"
        variant="outlined"
        size="small"
        sx={{
          width: 300,
          margin: "0.5rem 3rem",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <ErrorMessage name="email" component="div" className="error" />{" "}
    </Fragment>
  );
};

export const PasswordField = () => {
  return (
    <Fragment>
      <Field
        as={TextField}
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        size="small"
        sx={{
          width: 300,
          margin: "0.5rem 3rem",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <ErrorMessage name="password" component="div" className="error" />{" "}
    </Fragment>
  );
};

export const ConfirmPasswordField = () => {
  return (
    <Fragment>
      <Field
        as={TextField}
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        variant="outlined"
        size="small"
        sx={{
          width: 300,
          margin: "0.5rem 3rem",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <ErrorMessage name="confirmPassword" component="div" className="error" />
    </Fragment>
  );
};

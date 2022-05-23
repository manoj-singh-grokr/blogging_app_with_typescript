import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid, InputAdornment, Modal, styled } from "@mui/material";

import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const BlurryModal = styled(Modal)((props) => ({
  backdropFilter: props.open ? "blur(5px)" : "none",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 700,
  height: 400,
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFFFFF",
  borderRadius: "1rem",
  p: 4,
  textAlign: "center",
};

const validationSchema = Yup.object({
  email: Yup.string().required("email is required!"),
  password: Yup.string().required("password is required!"),
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

const initialValues = {
  email: "",
  password: "",
};

const LoginDialog: React.FC<Props> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(fetchUser(values));
    handleClose();
  };

  return (
    <BlurryModal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-form-modal"
      aria-describedby="login-form-modal"
    >
      <Grid container spacing={2} sx={style}>
        <Grid
          item
          xs={5}
          md={5}
          sx={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2021/11/18/11/35/attack-6806140_960_720.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderBottomLeftRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        ></Grid>
        <Grid item xs={7} md={7}>
          <h2>LOGIN</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: 300,
                    margin: "1rem 3rem",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: 300,
                    margin: "1rem 3rem",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ marginLeft: "10%", marginTop: "1rem", width: 100 }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </BlurryModal>
  );
};

export default LoginDialog;

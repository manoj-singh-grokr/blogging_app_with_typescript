import React from "react";
import { Formik, Form } from "formik";
import { Grid, Modal, styled } from "@mui/material";
import {
  registerValidationSchema,
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  FirstNameField,
  LastNameField,
} from "./InputFields";

import Button from "@mui/material/Button";
import { registerUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const BlurryModal = styled(Modal)((props) => ({
  backdropFilter: props.open ? "blur(5px)" : "none",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 700,
  height: 500,
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFFFFF",
  borderRadius: "1rem",
  p: 4,
  textAlign: "center",
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterDialog: React.FC<Props> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: any) => {
    dispatch(registerUser(values));
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://cdn.pixabay.com/photo/2021/07/14/18/26/mountains-6466816_960_720.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderBottomLeftRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        ></Grid>
        <Grid item xs={7} md={7}>
          <h2>Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FirstNameField />
                <LastNameField />
                <EmailField />
                <PasswordField />
                <ConfirmPasswordField />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ marginLeft: "10%", marginTop: "1rem", width: 100 }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </BlurryModal>
  );
};

export default RegisterDialog;

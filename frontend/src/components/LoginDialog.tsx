import React from "react";
import { Formik, Form } from "formik";
import { Grid, Modal, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/slices/userSlice";
import {
  EmailField,
  PasswordField,
  loginValidationSchema,
} from "./InputFields";

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
            validationSchema={loginValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <EmailField />
                <PasswordField />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  role="loginButton"
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

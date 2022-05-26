import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addBlog } from "../redux/slices/blogsSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("title is required!"),
  content: Yup.string().required("content is required!"),
});

const initialValues = {
  title: "",
  content: "",
};

interface Props {}

interface Blog {
  userId: string;
  title: string;
  content: string;
}

const BlogForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: any) => state.user.userInfo);

  const handleSubmit = (values: { title: string; content: string }) => {
    const blog: Blog = {
      userId: userInfo[0].id,
      title: values.title,
      content: values.content,
    };
    dispatch(addBlog(blog));
    navigate("/blogs");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field
              as={TextField}
              type="text"
              name="title"
              label="Title"
              variant="outlined"
              size="small"
              sx={{ width: 600 }}
            />
            <ErrorMessage name="title" component="div" className="error" />
            <Field
              as={TextField}
              type="text"
              name="content"
              label="Content"
              variant="outlined"
              size="small"
              multiline
              rows={6}
              sx={{ width: 600 }}
            />
            <ErrorMessage name="content" component="div" className="error" />

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              role="blogSubmitButton"
              sx={{ marginTop: "1rem", width: 100 }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BlogForm;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const BlogFormPage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <h1 className="heading">Write a blog</h1>
      <BlogForm />
    </div>
  );
};

export default BlogFormPage;

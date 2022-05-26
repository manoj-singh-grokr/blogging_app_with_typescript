import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import { fetchBlogs } from "../redux/slices/blogsSlice";
import { AppDispatch } from "../redux/store";

const Blogspage = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userInfo[0]) {
      dispatch(fetchBlogs({ id: userInfo[0].id }));
    }
  }, [userInfo, dispatch]);
  const blogs = useSelector((state: any) => state.blogs.blogs);
  return (
    <div>
      {blogs.map((blog: any) => (
        <Blogs key={blog.id} title={blog.title} content={blog.content} />
      ))}
    </div>
  );
};

export default Blogspage;

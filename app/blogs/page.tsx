import React from "react";
import { getBlogs } from "../service/getBlogs";
import MyServerComponent from "../ui/MyServerComponent";
import { cacheLife } from "next/cache";


type Blog = {
  id: number;
  title: string;
  body: string;
};

const BlogsPage = async() => {
//  "use cache";
//    cacheLife("hours");

  // const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const postData = await posts.json();
  // console.log(postData);


  const blogs = await getBlogs();
  console.log(blogs);

  return(
    <div>Blogs Page
      {
        blogs.map((blog: Blog)=>(
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
          </div>
        ))
      }
      <MyServerComponent></MyServerComponent>
    </div>
  );
};

export default BlogsPage;

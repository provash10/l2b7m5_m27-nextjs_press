import { revalidateTag } from "next/cache";


export const getBlogs = async()=>{
  //  "use cache";
  //  cacheLife("hours");

  const posts = await fetch("https://jsonplaceholder.typicode.com/posts",{
    method: "POST",
    cache:"force-cache",
    next : {
      revalidate : 60 * 60 * 24, // 1 day
      tags: ["posts"]
    }

  });
  const postData = await posts.json();
  console.log(postData);

  return postData;
}

const renewBlogCache=()=>{
  // revalidateTag("posts", "max")
   revalidateTag("posts",{
    expire : 60 * 60 * 24 * 7,   // 7 days
   })
}
import Link from "next/link";
import LikeButton from "./ui/LikeButton";

export default function Home(){
  console.log("Root Route")
  return(
    <div>
      Hello Nextjs 
      Blogs Page :  <Link href={"/blogs"}>Blogs</Link>

      <LikeButton></LikeButton>
      
    </div>
  )
}

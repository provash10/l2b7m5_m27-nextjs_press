import { Button } from "@/components/ui/button";

export default function HomePage(){
  console.log("Root Route")
  return(
    <div>
      Hello Nextjs !! 

      <Button size={"xs"} variant={"destructive"}
      >
        Click Me
        </Button>
    </div>
  );
}

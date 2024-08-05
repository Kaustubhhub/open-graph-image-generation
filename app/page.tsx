import Image from "next/image";
import { Appbar } from "./components/Appbar";
import { CreatePostBox } from "./components/CreatePostBox";

export default function Home() {
  return (
    <main className="">
      <div className="px-6">
        <Appbar />
      </div>
      <div className="p-10 flex justify-center">
        <CreatePostBox/>
      </div>
    </main>
  );
}

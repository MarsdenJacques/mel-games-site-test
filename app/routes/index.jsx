import { Link, useOutletContext } from "remix";
import Button from "~/components/button";
export const meta = () => {
  return {
    title: "Home",
    description:
      "Welcome to Happy Valley, where all things are happily vag rounded.",
  };
};
export default function Index() {

  const { isTeacher } = useOutletContext()

  return (
  <div id="wrapper" className="">
    <div id="header" className="bg-blue-300 p-4 px-8 font-bold text-zinc-100 flex flex-row justify-between items-center">
      <div id="titlelogo" className="font-vag text-3xl text-zinc-100">
        <h1>happy valley digital</h1>
      </div>
      <div id="nav-menu" className="flex flex-row items-center justify-end gap-4">
        <div className="text-blue-500"><Link to={'/lesson-viewer'}>Lesson Viewer</Link></div>
        <div className="text-blue-500">{isTeacher ? <Link to={'/lesson-maker'}>Lesson Maker</Link> : <></>}</div>
      </div>
    </div>
    <div id="banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1232&q=80)'}} className="h-96 bg-cover">

    </div>
  </div>
  );
}

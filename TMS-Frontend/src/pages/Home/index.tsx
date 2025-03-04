import Sidebar from "../../components/Sidebar";
import TaskList from "../../components/TaskList";

const Home = () => {
  return (
    <div className="lg:flex px-5 lg:px-20 pt-[2.9]">
      <div className="hidden lg:block w-[25vw] relative">
        <Sidebar />
      </div>
      <div className="right-side w-full flex justify-center mb-10">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;

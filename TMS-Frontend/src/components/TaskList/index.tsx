import TaskCard from "../TaskCard";
import { useEffect } from "react";
import { fetchTasks, fetchUsersTasks } from "../../services/TaskService";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLocation } from "react-router-dom";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { task, auth } = useAppSelector((store) => store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");
  useEffect(() => {
    if (auth.user?.role === "ROLE_ADMIN") {
      dispatch(fetchTasks({ status: filterValue }));
    } else {
      dispatch(fetchUsersTasks({ status: filterValue }));
    }
  }, [dispatch, filterValue, auth.user?.role]);
  return (
    <div className="space-y-5 w-[67vw]">
      <div className="space-y-3">
        {auth.user?.role === "ROLE_ADMIN"
          ? task.tasks.map((task) => <TaskCard task={task} key={task.id} />)
          : task.userTasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
      </div>
    </div>
  );
};

export default TaskList;

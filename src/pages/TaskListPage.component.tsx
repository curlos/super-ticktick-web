import { useState } from "react";
import Icon from "../components/Icon.component";
import TaskList from "../components/TaskList.component";

interface TaskListByCategoryProps {
    tasks: Array<Object>,
    closedLists: Array<String>,
    setClosedLists: React.Dispatch<React.SetStateAction<string[]>>;
}

const TaskListByCategory: React.FC<TaskListByCategoryProps> = ({ tasks, closedLists, setClosedLists }) => {

    return (
        <div>
            <div className="flex items-center text-[12px]">
                <Icon name="chevron_right" customClass={"text-color-gray-100 !text-[16px]"} />
                <span className="mr-[6px]">High</span>
                <span className="text-color-gray-100">3</span>
            </div>

            <TaskList tasks={tasks} />
        </div>
    );
};

const TaskListPage = () => {
    const [closedLists, setClosedLists] = useState<string[]>([]);
    const tasks = [{}];

    return (
        <div className="w-full h-full bg-color-gray-700">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <Icon name="menu_open" customClass={"text-white !text-[24px]"} />
                        <h3 className="text-[20px]">Hello Mobile</h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <Icon name="swap_vert" customClass={"text-white !text-[24px]"} />
                        <Icon name="more_horiz" customClass={"text-white !text-[24px]"} />
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-1 bg-color-gray-600 rounded-lg p-3 text-color-gray-100">
                    <Icon name="add" customClass={"text-color-gray-100 !text-[20px]"} />
                    Add task to "Hello Mobile", press Enter to save.
                </div>

                <div className="mt-4 space-y-4">
                    <TaskListByCategory tasks={tasks} closedLists={closedLists} setClosedLists={setClosedLists} />

                </div>
            </div>
        </div>
    );
};

export default TaskListPage;
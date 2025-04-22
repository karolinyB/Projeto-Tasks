import { ChevronRightIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonTask from "./CButtonTask";
import ButtonOptions from "./CButtonOptions";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {

    const navigate = useNavigate();

    function onSeeDetailsClick(task) {

        // Permite obter os dados por parâmetros de forma mais segura
        const query = new URLSearchParams();

        query.set("title", task.tb_task_title);
        query.set("description", task.tb_task_description);

        navigate(`/taskDetails?${query.toString()}`);
    }

    return (
        <ul className="space-y-3 p-6 bg-zinc-800 rounded-md">
            {
                tasks.map((task) => (
                    <li key={task.tb_task_id} className="flex gap-2 text-sm">
                        <ButtonTask
                            onClick={() => onTaskClick(task.tb_task_id, task.tb_task_is_completed)}
                            className={
                                `text-zinc-800 text-left bg-violet-300 p-2 rounded-md shadow w-full
                                ${task.tb_task_is_completed && "line-through"}`
                            }
                        >
                            {task.tb_task_title}
                        </ButtonTask>

                        <ButtonOptions
                            className="bg-green-200 p-2 rounded-md text-slate-950"
                            onClick={() => onSeeDetailsClick(task)}
                        >
                            <ChevronRightIcon />
                        </ButtonOptions>

                        <ButtonOptions
                            onClick={() => onDeleteTaskClick(task.tb_task_id)}
                        >
                            <Trash />
                        </ButtonOptions>

                    </li>
                ))
            }
        </ul>
    );
}

export default Tasks;

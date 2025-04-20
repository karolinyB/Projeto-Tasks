import { ChevronRightIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonTask from "./CButtonTask";
import ButtonOptions from "./CButtonOptions";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {

    const navigate = useNavigate();

    function onSeeDetailsClick(task) {

        // Permite obter os dados por parâmetros de forma mais segura
        const query = new URLSearchParams();

        query.set("title", task.title);
        query.set("description", task.description);

        navigate(`/taskDetails?${query.toString()}`);
    }

    return (
        <ul className="space-y-3 p-6 bg-zinc-800 rounded-md">
            {
                tasks.map((task) => (
                    <li key={task.id} className="flex gap-2 text-sm">
                        <ButtonTask
                            onClick={() => onTaskClick(task.id)}
                            className={
                                `text-zinc-800 text-left bg-violet-300 p-2 rounded-md shadow w-full
                                ${task.isCompleted && "line-through"}`
                            }
                        >
                            {task.title}
                        </ButtonTask>

                        <ButtonOptions
                            className="bg-green-200 p-2 rounded-md text-slate-950"
                            onClick={() => onSeeDetailsClick(task)}
                        >
                            <ChevronRightIcon />
                        </ButtonOptions>

                        <ButtonOptions
                            onClick={() => onDeleteTaskClick(task.id)}
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

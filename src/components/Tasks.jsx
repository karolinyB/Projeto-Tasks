import { ChevronRightIcon, Trash2  } from "lucide-react";

function Tasks(props) {
    return (
        <ul className="space-y-3 p-6 bg-zinc-800 rounded-md">
            {
                props.tasks.map((task) => (
                    <li key={task.id} className="flex gap-2 text-sm"> 
                        <button
                            onClick={() => props.onTaskClick(task.id)} 
                            className={`text-zinc-800 text-left bg-violet-300 p-2 rounded-md shadow w-full
                            ${
                                task.isCompleted && "line-through"
                            }`}
                        >
                            {task.title}
                            {task.isCompleted ? " COMPLETE" : " INCOMPLETE"}
                        </button>
                        <button className="bg-violet-200 p-2 rounded-md text-slate-950">
                            <ChevronRightIcon />
                        </button>
                        <button className="bg-violet-200 p-2 rounded-md text-slate-950">
                            <Trash2 />
                        </button>
                    </li>    
                ))
            }
        </ul>
    );
}

export default Tasks;

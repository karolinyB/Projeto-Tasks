import { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar programação",
      description: "Estudar programação mobile com a linguagem Java",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Lavar roupas",
      description: "Lavar todas as roupas rosas e verdes",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Ensaiar apresentação de Inglês",
      description: "Treinar apresentação de inglês com vídeos interativos",
      isCompleted: false,
    },  
]);

function onTaskClick(taskId) {
  const newTasks = tasks.map((task) => {

    // Atualiza a tarefa que foi clicada
    if (task.id == taskId) {
      return {...task, isCompleted: !task.isCompleted}
    }

    //Não preciso atualizar a tarefa
    return task;
  })
  
  setTasks(newTasks);
}

  return (
    <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6 font-jetbrains">
      <div className="w-[600px]">
        <h1 className="text-violet-300 font-bold text-center text-2xl p-6">Gerenciador de Tarefas</h1>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} />
        <AddTask />
      </div>
    </div>
    
  );
}

export default App;
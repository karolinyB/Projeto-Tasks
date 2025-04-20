import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/CTitle";
import Test from "./components/Test";

function App() {
  const [tasks, setTasks] = useState(() => {
      const data = localStorage.getItem("createdTasks");
  
        return JSON.parse(data) || [];
  
    })

  // Criação de um efeito quando algo é alterado
  // Nesse caso, a função é executada quando o useEffect() identifica alguma alteração no objeto 'tasks'
  useEffect(() => {

      // 'tasks' é o nome utilizado para identificar o dado a ser armazenado
      // O dado a ser armazenado será definido em formato JSON como string 
      localStorage.setItem("createdTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Como é passado uma lista vazia, essa função só será executada uma vez na applicação
  // Não é possível usar async direto no useEffect(), por isso é necessário criar uma função assíncrona
  useEffect(() => {

    // Função Assíncrona -> é uma função que trabalhará com operações assíncronas, ou seja, que não ocorrem imediatamente,
    //pois necessitará esperar por operações para que as outras operações possam ser efetuadas.

        // await -> esse comando funciona como uma "pausa" para que o próxima instrução só seja executada quando esta instrução for resolvida.
                  // Desta forma, o programa irá esperar esse comando ser tratado de forma completa, mesmo que demore alguns segundos, para depois
                  // passar à próxima instrução.

    // Função Síncrona -> é uma função que executa linha por linha de forma imediata, sem agurdar por nada externo.
    async function fetchTasks() {
      
    // Chamar a API

    // Aguarda o resultado da api
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {

      // Determina o método desta requisição que no caso é o GET -> consulta
      method: 'GET',
    });

    // Aguarda a resposta da api e a converte em JSON
    const datas = await response.json();
    console.log(datas);


    // Armazenar os dados no state
    setTasks(datas);

    }

    //fetchTasks();
  }, [])

  function onAddTaskClick(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    }

    // Insere todas as tarefas em conjunto com a nova tarefa criada
    setTasks([...tasks, newTask]);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {

      // Atualiza a tarefa que foi clicada
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }

      //Não preciso atualizar a tarefa
      return task;
    })

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const updateTasks = tasks.filter((task) => {
      if (taskId !== task.id)
        return task;
    });

    setTasks(updateTasks);
  }

  return (
    <div className="w-screen min-h-screen bg-neutral-900 flex justify-center p-6 font-inter">
      <div className="w-[600px] space-y-5">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskClick={onAddTaskClick} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
        <Test />
      </div>
    </div>

  );
}

export default App;
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/CTitle";
import Test from "./components/Test";
import { nhost } from "./lib/nhost";
import { useSubscription, useMutation } from '@apollo/client';
import { INSERT_TASK } from "./graphql/mutations";
import { GET_TASKS } from "./graphql/subscriptions";
import { UPDATE_TASK_STATUS_COMPLETED } from "./graphql/mutations";

function App() {


  //Hooks
  const { data: subscriptionData, error: subscriptionError } = useSubscription(GET_TASKS);

  const [tasks, setTasks] = useState([]);
  const [updateTask] = useMutation(UPDATE_TASK_STATUS_COMPLETED);

  // Criação de um efeito quando algo é alterado
  // Nesse caso, a função é executada quando o useEffect() identifica alguma alteração no objeto 'tasks'
  useEffect(() => {

    // Verifica se subscriptionData existe antes de tentar acessar o tb_task 
    // É o mesmo que subscriptionData && subscriptionData.tb_task
    if (subscriptionData?.tb_task) {
      setTasks(subscriptionData.tb_task);
    }

    console.log(tasks);

  }, [subscriptionData]);

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

  async function onAddTaskClick(title, description) {
    /*const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    }*/

    const { data, error } = await nhost.graphql.request(INSERT_TASK, {
      tb_task_title: title,
      tb_task_description: description,
    });

    if (error) {
      console.log("❌ Erro ao inserir a tarefa: ", error);
      return
    }

    console.log("✅ TASK INSERIDA COM SUCESSO");
    console.log(data.insert_tb_task.returning[0].tb_task_title);


    // Insere todas as tarefas em conjunto com a nova tarefa criada
    //setTasks([...tasks, newTask]);
  }


  //** ARRUMAR ESSA PARTE
  async function onTaskClick(taskId, isCompleted) {

    console.log(taskId);
    console.log(isCompleted);

    try {
      await updateTask({
        variables:
        {
          tb_task_id: taskId,
          tb_task_is_completed: !isCompleted
        }
      });

      console.log("Atualizado com sucesso!");

    } catch (erro) {
      console.log("ERRO AO ATUALIZAR: ", erro);
    }

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
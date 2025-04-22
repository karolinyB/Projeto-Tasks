import { useState } from "react";
import Input from './CInput'

function AddTask({ onAddTaskClick }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="space-y-4 p-6 bg-zinc-800 rounded-md flex flex-col text-sm">
            <Input
                type="text"
                placeholder="Digite o nome da tarefa"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <Input
                type="text"
                placeholder="Digite a descrição da tarefa"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button
                className="p-2 bg-rose-700 rounded-md text-slate-100"
                onClick={ () => {

                    // Verifica se o titulo e descrição estão preenchidos
                    // trim() -> considera espaços em branco
                    //!title || !description -> identifica que não há nenhuma string de entrada
                    if(!title.trim() || !description.trim()) {
                       return alert("Preencha o título e a descrição da tarefa!");
                    }

                    onAddTaskClick(title, description);
                    setTitle("");
                    setDescription("");
                }}
            >
                Adicionar
            </button>
        </div>
    )

}

export default AddTask;
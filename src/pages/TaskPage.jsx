import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/CTitle";

function TaskPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const title = searchParams.get("title");
    const description = searchParams.get("description");

    return (
        <div className="w-screen h-screen bg-neutral-900 font-inter text-white p-6">
            <div className="w-[600px] space-y-4 mx-auto">
                <div className="flex justify-center relative mb-6">
                    <button
                        className="absolute left-0 top-0 bottom-0"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <Title>Detalhes da Tarefa</Title>
                </div>


                <div className="p-6 bg-zinc-800 rounded-md text-sm">
                    <h2 className="text-green-200 font-bold text-[1.05rem]">{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskPage;
import { useEffect } from "react";
import { nhost } from "../lib/nhost";

export default function NhostStatus() {
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const result = await nhost.graphql.request(`
                    query {
                            tb_task 
                            {
                                tb_task_is_completed
                                tb_task_title
                            }
                        }
                `);

                if (result.error) {
                    console.log("❌ Conexão falhou");
                }
                else {
                    console.log("✅ Conectado ao Nhost");
                    console.log(result);
                }
            }
            catch (e) {
                console.log("❌ Erro ao conectar: ");
                console.error(e);
            }
        }

        checkStatus();
    }, []);
}
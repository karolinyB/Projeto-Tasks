import { gql } from '@apollo/client';
// Cadastro de tarefas no banco de dados
export const INSERT_TASK = `
            mutation MyMutation(
                $tb_task_description: String,
                $tb_task_title: String!
            ) {
                insert_tb_task(objects: 
                {
                    tb_task_description: $tb_task_description,
                    tb_task_title: $tb_task_title
            }) {
                returning 
                    {
                        tb_task_id
                        tb_task_title
                        tb_task_description
                        tb_task_is_completed
                    }
                }
            }

`

export const UPDATE_TASK_STATUS_COMPLETED = gql`
        mutation MyMutationUpdate(
        $tb_task_id: uuid!,
        $tb_task_is_completed: Boolean!
        ) {
            update_tb_task_by_pk
            (
                pk_columns: {tb_task_id: $tb_task_id}, 
                _set: {tb_task_is_completed: $tb_task_is_completed}
                                    
            )
            {
                tb_task_id
                tb_task_is_completed
            } 
}`
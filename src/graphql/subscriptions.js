import { gql } from '@apollo/client';

export const GET_TASKS = gql`
            subscription MySubscription {
            
            tb_task 
                {
                    tb_task_description
                    tb_task_id
                    tb_task_is_completed
                    tb_task_title
                }
            }
`
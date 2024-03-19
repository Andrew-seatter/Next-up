import { gql } from "@apollo/client";

export const GET_JOBS = gql`
    query GetJobs($user_id: ID!) {
        getJobs(user_id: $user_id) {
            jobs {
                _id
                jobTitle
                companyIcon
                companyName
                notes
                status
                appUrl
                contactName
                dateApplied
            }
        }
    }
`
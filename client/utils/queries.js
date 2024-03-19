import { gql } from "@apollo/client";

export const GET_JOBS = gql`
    query GetJobs($user_id: ID!) {
        jobs(user_id: $user_id) {
            _id
            jobTitle
            companyIcon
            companyName
            note
            status
            appUrl
            followUp
            contactName
            createdAt
            stars
        }
    }
`
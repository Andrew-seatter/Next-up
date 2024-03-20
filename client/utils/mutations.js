import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation LogIn($email: String!, $password: String! ){
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOB = gql `
mutation addJob($input: JobInput!) {
        addJob(input: $input){
                jobTitle
                companyName
                user_id
                stars
                note
                companyIcon
                createdAt
                likes {
                    likeAuthor
                    like
                    createdAt
                }
            }
    }
`

export const UPDATE_JOB = gql `
mutation updateJob($jobId: ID!, $input: JobInput!) {
        updateJob(jobId: $jobId, input: $input){
                jobTitle
                companyName
                user_id
                stars
                note
                companyIcon
                createdAt
                likes {
                    likeAuthor
                    like
                    createdAt
                }
            }
    }
`



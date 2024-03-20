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
mutation addJob($jobTitle: String!, $jobCompany: String!, $user_id: ID!, $stars: Int!, 
    $note: String!, $companyIcon: String! ) {
        addJob(jobTitle: $jobTitle, jobCompany: $jobCompany, user_id: $user_id, 
            stars: $stars, note: $note, companyIcon: $companyIcon){
                jobTitle
                jobCompany
                user_id
                stars
                note
                comapnyIcon
                createdAt
                likes {
                    likeAuthor
                    like
                    createdAt
                }
            }
    }
`

export const DELETE_JOB = gql `
mutation deleteJob($jobTitle: String!, $jobCompany: String!, $user_id: ID!, $stars: Int!, 
    $note: String!, $companyIcon: String! ) {
        deleteJob(jobTitle: $jobTitle, jobCompany: $jobCompany, user_id: $user_id, 
            stars: $stars, note: $note, companyIcon: $companyIcon){
                jobTitle
                jobCompany
                user_id
                stars
                note
                comapnyIcon
                createdAt
                likes {
                    likeAuthor
                    like
                    createdAt
                }
            }
    }
`


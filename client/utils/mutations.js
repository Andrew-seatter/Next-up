import { gql } from '@apollo/client'

export const ADD_USER= gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                username
            }
            token
        }
    }
`

export const LOGIN = gql`
    mutation LogIn($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                username
            }
            token
        }
    }
`
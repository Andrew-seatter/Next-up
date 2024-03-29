import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const ADD_JOB = gql`
  mutation addJob($input: JobInput!) {
    addJob(input: $input) {
      jobTitle
      companyName
      contactName
      createdAt
      dateString
      user_id
      stars
      followUp
      note
      companyIcon
      appUrl
      status
      salaryRangeLow
      salaryRangeHigh
      dateString
      likes {
        likeAuthor
        like
        createdAt
      }
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation updateJob($jobId: ID!, $input: JobInput!) {
    updateJob(jobId: $jobId, input: $input) {
      jobTitle
      companyName
      contactName
      createdAt
      dateString
      user_id
      stars
      followUp
      note
      companyIcon
      appUrl
      status
      salaryRangeLow
      salaryRangeHigh
      dateString
      likes {
        likeAuthor
        like
        createdAt
      }
    }
  }
`;
export const REMOVE_JOB = gql`
  mutation removeJob($jobId: ID!, $userId: ID!) {
    removeJob(jobId: $jobId, userId: $userId) {
      jobTitle
    }
  }
`;

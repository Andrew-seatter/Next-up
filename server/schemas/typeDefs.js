const typeDefs = `
type User {
    _id: ID
    username: String
    password: String
    jobs: [Jobs]
    goals: [Goals]
    friends: [Friend]
    friendRequests: [FriendRequest]
}

type Jobs {
    _id: ID
    jobTitle: String
    jobCompany: String
    jobAuthor: User
    createdAt: String
    stars: Int
    followUp: Boolean
    note: String
    companyIcon: String
    likes: [Likes]
}

type Likes {
    _id: ID
    likeAuthor: String
    like: Boolean
    createdAt: String
}

type Goals {
    _id: ID
    goalText: String
    goalStatus: String
    createdAt: String
    goalAuthor: String
}

type Friend {
    _id: ID
    friend: User
    createdAt: String
}

type FriendRequest {
    _id: ID
    friend: User
    createdAt: String
    status: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    jobs(username: String): [Jobs]
    job(jobId: ID!): Jobs
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJob(jobTitle: String!, jobCompany: String!, stars: Int!, note: String!, companyIcon: String!): Jobs
    addLike(likeId: ID!, like: Boolean): Jobs
    removeJob(jobId: ID!): Jobs
    removeLike(jobId: ID!, likeId: ID!): Jobs
  }
`;

module.exports = typeDefs;
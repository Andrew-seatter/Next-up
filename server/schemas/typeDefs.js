const typeDefs = `
type User {
    _id: ID
    username: String
    password: String
    jobs: [Jobs]
    goals: [Goals]
    friends: [Friends]
    friendRequests: [friendRequests]
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
`;

module.exports = typeDefs;
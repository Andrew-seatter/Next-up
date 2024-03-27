const typeDefs = `
type User {
    _id: ID
    username: String
    password: String
    jobs: [Job]
    goals: [Goals]
    friends: [Friend]
    friendRequests: [FriendRequest]
    jobsThisWeek: Int
}

input JobInput {
    user_id: ID!
    jobTitle: String!
    companyName: String!
    contactName: String
    contactInfo: String
    createdAt: String!
    dateString: String!
    stars: Int!
    followUp: Boolean
    note: String
    companyIcon: String
    appUrl: String
    status: String!
    salaryRangeLow: Int
    salaryRangeHigh: Int
    desiredSalary: Int
}

type Job {
    _id: ID
    user_id: ID!
    jobTitle: String!
    companyName: String!
    contactName: String
    contactInfo: String 
    createdAt: String!
    dateString: String
    stars: Int!
    followUp: Boolean
    note: String
    companyIcon: String
    appUrl: String
    status: String!
    likes: [Likes]
    salaryRangeLow: Int
    salaryRangeHigh: Int
    desiredSalary: Int
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
    jobs(user_id: ID!): [Job]
    job(jobId: ID!): Job
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJob(input: JobInput!): Job
    updateJob(jobId: ID!, input: JobInput!): Job
    addLike(likeId: ID!, like: Boolean): Job
    removeJob(jobId: ID!, userId: ID!): Job
    removeLike(jobId: ID!, likeId: ID!): Job
}

type ApplicationDateCount {
    date: String
    count: Int
}

extend type Query {
    applicationsOverTime: [ApplicationDateCount]
}

type JobStatusCount {
    status: String
    count: Int
}

extend type Query {
    jobStatusCounts: [JobStatusCount]
}



`;

module.exports = typeDefs;
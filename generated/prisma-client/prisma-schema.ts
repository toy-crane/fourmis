// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateBoard {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Board {
  id: ID!
  product: Product!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
}

type BoardConnection {
  pageInfo: PageInfo!
  edges: [BoardEdge]!
  aggregate: AggregateBoard!
}

input BoardCreateInput {
  id: ID
  product: ProductCreateOneWithoutBoardInput!
  posts: PostCreateManyWithoutBoardInput
}

input BoardCreateOneWithoutPostsInput {
  create: BoardCreateWithoutPostsInput
  connect: BoardWhereUniqueInput
}

input BoardCreateOneWithoutProductInput {
  create: BoardCreateWithoutProductInput
  connect: BoardWhereUniqueInput
}

input BoardCreateWithoutPostsInput {
  id: ID
  product: ProductCreateOneWithoutBoardInput!
}

input BoardCreateWithoutProductInput {
  id: ID
  posts: PostCreateManyWithoutBoardInput
}

type BoardEdge {
  node: Board!
  cursor: String!
}

enum BoardOrderByInput {
  id_ASC
  id_DESC
}

type BoardPreviousValues {
  id: ID!
}

type BoardSubscriptionPayload {
  mutation: MutationType!
  node: Board
  updatedFields: [String!]
  previousValues: BoardPreviousValues
}

input BoardSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BoardWhereInput
  AND: [BoardSubscriptionWhereInput!]
  OR: [BoardSubscriptionWhereInput!]
  NOT: [BoardSubscriptionWhereInput!]
}

input BoardUpdateInput {
  product: ProductUpdateOneRequiredWithoutBoardInput
  posts: PostUpdateManyWithoutBoardInput
}

input BoardUpdateOneWithoutPostsInput {
  create: BoardCreateWithoutPostsInput
  update: BoardUpdateWithoutPostsDataInput
  upsert: BoardUpsertWithoutPostsInput
  delete: Boolean
  disconnect: Boolean
  connect: BoardWhereUniqueInput
}

input BoardUpdateOneWithoutProductInput {
  create: BoardCreateWithoutProductInput
  update: BoardUpdateWithoutProductDataInput
  upsert: BoardUpsertWithoutProductInput
  delete: Boolean
  disconnect: Boolean
  connect: BoardWhereUniqueInput
}

input BoardUpdateWithoutPostsDataInput {
  product: ProductUpdateOneRequiredWithoutBoardInput
}

input BoardUpdateWithoutProductDataInput {
  posts: PostUpdateManyWithoutBoardInput
}

input BoardUpsertWithoutPostsInput {
  update: BoardUpdateWithoutPostsDataInput!
  create: BoardCreateWithoutPostsInput!
}

input BoardUpsertWithoutProductInput {
  update: BoardUpdateWithoutProductDataInput!
  create: BoardCreateWithoutProductInput!
}

input BoardWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  product: ProductWhereInput
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  AND: [BoardWhereInput!]
  OR: [BoardWhereInput!]
  NOT: [BoardWhereInput!]
}

input BoardWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createBoard(data: BoardCreateInput!): Board!
  updateBoard(data: BoardUpdateInput!, where: BoardWhereUniqueInput!): Board
  upsertBoard(where: BoardWhereUniqueInput!, create: BoardCreateInput!, update: BoardUpdateInput!): Board!
  deleteBoard(where: BoardWhereUniqueInput!): Board
  deleteManyBoards(where: BoardWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  board: Board
  title: String!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  id: ID
  board: BoardCreateOneWithoutPostsInput
  title: String!
  content: String!
}

input PostCreateManyWithoutBoardInput {
  create: [PostCreateWithoutBoardInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutBoardInput {
  id: ID
  title: String!
  content: String!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  title: String!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  board: BoardUpdateOneWithoutPostsInput
  title: String
  content: String
}

input PostUpdateManyDataInput {
  title: String
  content: String
}

input PostUpdateManyMutationInput {
  title: String
  content: String
}

input PostUpdateManyWithoutBoardInput {
  create: [PostCreateWithoutBoardInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  set: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutBoardInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutBoardInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateWithoutBoardDataInput {
  title: String
  content: String
}

input PostUpdateWithWhereUniqueWithoutBoardInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutBoardDataInput!
}

input PostUpsertWithWhereUniqueWithoutBoardInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutBoardDataInput!
  create: PostCreateWithoutBoardInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  board: BoardWhereInput
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Product {
  id: ID!
  symbol: String!
  engName: String!
  korName: String!
  board: Board
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  id: ID
  symbol: String!
  engName: String!
  korName: String!
  board: BoardCreateOneWithoutProductInput
}

input ProductCreateOneWithoutBoardInput {
  create: ProductCreateWithoutBoardInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutBoardInput {
  id: ID
  symbol: String!
  engName: String!
  korName: String!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  symbol_ASC
  symbol_DESC
  engName_ASC
  engName_DESC
  korName_ASC
  korName_DESC
}

type ProductPreviousValues {
  id: ID!
  symbol: String!
  engName: String!
  korName: String!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
  AND: [ProductSubscriptionWhereInput!]
  OR: [ProductSubscriptionWhereInput!]
  NOT: [ProductSubscriptionWhereInput!]
}

input ProductUpdateInput {
  symbol: String
  engName: String
  korName: String
  board: BoardUpdateOneWithoutProductInput
}

input ProductUpdateManyMutationInput {
  symbol: String
  engName: String
  korName: String
}

input ProductUpdateOneRequiredWithoutBoardInput {
  create: ProductCreateWithoutBoardInput
  update: ProductUpdateWithoutBoardDataInput
  upsert: ProductUpsertWithoutBoardInput
  connect: ProductWhereUniqueInput
}

input ProductUpdateWithoutBoardDataInput {
  symbol: String
  engName: String
  korName: String
}

input ProductUpsertWithoutBoardInput {
  update: ProductUpdateWithoutBoardDataInput!
  create: ProductCreateWithoutBoardInput!
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  symbol: String
  symbol_not: String
  symbol_in: [String!]
  symbol_not_in: [String!]
  symbol_lt: String
  symbol_lte: String
  symbol_gt: String
  symbol_gte: String
  symbol_contains: String
  symbol_not_contains: String
  symbol_starts_with: String
  symbol_not_starts_with: String
  symbol_ends_with: String
  symbol_not_ends_with: String
  engName: String
  engName_not: String
  engName_in: [String!]
  engName_not_in: [String!]
  engName_lt: String
  engName_lte: String
  engName_gt: String
  engName_gte: String
  engName_contains: String
  engName_not_contains: String
  engName_starts_with: String
  engName_not_starts_with: String
  engName_ends_with: String
  engName_not_ends_with: String
  korName: String
  korName_not: String
  korName_in: [String!]
  korName_not_in: [String!]
  korName_lt: String
  korName_lte: String
  korName_gt: String
  korName_gte: String
  korName_contains: String
  korName_not_contains: String
  korName_starts_with: String
  korName_not_starts_with: String
  korName_ends_with: String
  korName_not_ends_with: String
  board: BoardWhereInput
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
  symbol: String
  engName: String
  korName: String
}

type Query {
  board(where: BoardWhereUniqueInput!): Board
  boards(where: BoardWhereInput, orderBy: BoardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Board]!
  boardsConnection(where: BoardWhereInput, orderBy: BoardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BoardConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  board(where: BoardSubscriptionWhereInput): BoardSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String
  username: String
  name: String
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  password: String
  username: String
  name: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  username_ASC
  username_DESC
  name_ASC
  name_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String
  username: String
  name: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  username: String
  name: String
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  username: String
  name: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  username: String
}
`
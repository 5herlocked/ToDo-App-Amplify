/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      queryTitle
      description
      queryDescription
      status
      dueDate
      createdAt
      updatedAt
      sharedWith
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        queryTitle
        description
        queryDescription
        status
        dueDate
        createdAt
        updatedAt
        sharedWith
        owner
      }
      nextToken
    }
  }
`;
export const todoByTitle = /* GraphQL */ `
  query TodoByTitle(
    $id: ID
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoByTitle(
      id: $id
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        queryTitle
        description
        queryDescription
        status
        dueDate
        createdAt
        updatedAt
        sharedWith
        owner
      }
      nextToken
    }
  }
`;
export const todoByDescription = /* GraphQL */ `
  query TodoByDescription(
    $id: ID
    $description: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoByDescription(
      id: $id
      description: $description
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        queryTitle
        description
        queryDescription
        status
        dueDate
        createdAt
        updatedAt
        sharedWith
        owner
      }
      nextToken
    }
  }
`;
export const todoByDueDate = /* GraphQL */ `
  query TodoByDueDate(
    $id: ID
    $dueDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoByDueDate(
      id: $id
      dueDate: $dueDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        queryTitle
        description
        queryDescription
        status
        dueDate
        createdAt
        updatedAt
        sharedWith
        owner
      }
      nextToken
    }
  }
`;
export const todoByStatus = /* GraphQL */ `
  query TodoByStatus(
    $id: ID
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoByStatus(
      id: $id
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        queryTitle
        description
        queryDescription
        status
        dueDate
        createdAt
        updatedAt
        sharedWith
        owner
      }
      nextToken
    }
  }
`;

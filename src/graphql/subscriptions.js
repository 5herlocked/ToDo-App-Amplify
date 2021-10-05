/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String, $sharedWith: String) {
    onCreateTodo(owner: $owner, sharedWith: $sharedWith) {
      id
      title
      description
      status
      dueDate
      createdAt
      updatedAt
      sharedWith
      owner
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String, $sharedWith: String) {
    onUpdateTodo(owner: $owner, sharedWith: $sharedWith) {
      id
      title
      description
      status
      dueDate
      createdAt
      updatedAt
      sharedWith
      owner
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String, $sharedWith: String) {
    onDeleteTodo(owner: $owner, sharedWith: $sharedWith) {
      id
      title
      description
      status
      dueDate
      createdAt
      updatedAt
      sharedWith
      owner
    }
  }
`;

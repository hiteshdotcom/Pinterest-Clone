import { gql } from '@apollo/client';

export const QUERY_ALL_PINS = gql`
  query Query {
    pins {
      id
      title
      description
      img
      user
    }
  }
`;

export const SAVED_PIN = gql`
  mutation ($input: CreatePinInput!) {
    savedPin(input: $input) {
      title
    }
  }
`;

export const QUERY_USER_SAVED_PIN = gql`
  query ($user: String!) {
    userPins(user: $user) {
      savedPins {
        title
        description
        img
        id
        user
      }
    }
  }
`;
export const QUERY_MY_PINS = gql`
query ($user: String!) {
  userPins(user: $user) {
    myPins {
      title
      description
      img
      user
      id
    }
  }
}
`;

export const CREATE_PIN = gql`
mutation CreatePin($input: CreatePinInput!) {
  createPin(input: $input) {
    id
    title
    description
    img
  }
}
`;
export const SIGN_UP = gql`
mutation SignUp($email: String!,$name:String! ,$password: String!) {
  signUp(email: $email, password: $password, name: $name ) {
    token
  }
}
`;
export const SIGN_IN = gql`
mutation SignIn($email: String!,$password: String!) {
  signIn(email: $email, password: $password) {
    token
  }
}
`;

export const DELETE_PIN = gql`
  mutation Delete($deletePinId: ID!, $user: String!) {
    deletePin(id: $deletePinId, user: $user) {
      id
    }
  }
`;
export const DELETE_SAVED_PIN = gql`
  mutation ($deleteSavedPinId: ID!, $user: String!) {
    deleteSavedPin(id: $deleteSavedPinId, user: $user) {
      id
    }
  }
`;

export const READ_PIN = gql`
  query ReadPin($readPinId: ID!) {
    readPin(id: $readPinId) {
      id
      title
      img
      description
      user
    }
  }
`;

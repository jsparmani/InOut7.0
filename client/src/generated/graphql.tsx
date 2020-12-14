import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hi: Scalars['String'];
  me: AuthResponse;
  getStore: StoreResponse;
  listStores: StoreResponse;
};


export type QueryGetStoreArgs = {
  input: StoreGetInput;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
  accessToken?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  profile?: Maybe<Profile>;
  stores: Array<Store>;
  subscriptions: Array<Store>;
  orders: Array<Order>;
  cart: Cart;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  name: Scalars['String'];
  age: Scalars['Int'];
  gender: Gender;
  phone: Scalars['String'];
  addresses: Array<Address>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'OTHERS'
}

export type Address = {
  __typename?: 'Address';
  id: Scalars['Int'];
  houseNumber: Scalars['String'];
  street: Scalars['String'];
  landmark: Scalars['String'];
  num: Scalars['Int'];
  city: Scalars['String'];
  state: State;
  profile: Profile;
};

export enum State {
  Ap = 'AP',
  Ar = 'AR',
  As = 'AS',
  Br = 'BR',
  Cg = 'CG',
  Ga = 'GA'
}

export type Store = {
  __typename?: 'Store';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  products: Array<Product>;
  admins: Array<User>;
  subscribers: Array<User>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  code: Scalars['String'];
  availableQty: Scalars['Int'];
  store: Store;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  user: User;
  status: OrderStatus;
  address: Address;
  cart: Cart;
  total: Scalars['String'];
};

export enum OrderStatus {
  Received = 'RECEIVED',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED'
}

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['Int'];
  user: User;
  total: Scalars['String'];
  cartProducts: Array<CartProduct>;
};

export type CartProduct = {
  __typename?: 'CartProduct';
  id: Scalars['Int'];
  quantity: Scalars['Int'];
  cart: Cart;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
  field: Scalars['String'];
};

export type StoreResponse = {
  __typename?: 'StoreResponse';
  store?: Maybe<Store>;
  stores?: Maybe<Array<Store>>;
  errors?: Maybe<Array<FieldError>>;
};

export type StoreGetInput = {
  storeId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: AuthResponse;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  createorUpdateProfile: ProfileResponse;
  createAddress: AddressResponse;
  createStore: StoreResponse;
  updateStore: StoreResponse;
  deleteStore: Scalars['Int'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreateorUpdateProfileArgs = {
  input: ProfileInput;
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationCreateStoreArgs = {
  input: StoreCreateOrUpdateInput;
};


export type MutationUpdateStoreArgs = {
  input: StoreCreateOrUpdateInput;
};


export type MutationDeleteStoreArgs = {
  input: StoreGetInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  profile?: Maybe<Profile>;
  errors?: Maybe<Array<FieldError>>;
};

export type ProfileInput = {
  name: Scalars['String'];
  age: Scalars['Float'];
  gender: Scalars['String'];
  phone: Scalars['String'];
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  address?: Maybe<Address>;
  errors?: Maybe<Array<FieldError>>;
};

export type AddressInput = {
  houseNumber: Scalars['String'];
  street: Scalars['String'];
  landmark: Scalars['String'];
  num: Scalars['Float'];
  city: Scalars['String'];
  state: Scalars['String'];
};

export type StoreCreateOrUpdateInput = {
  storeId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  admins?: Maybe<Array<Scalars['Float']>>;
};

export type GetUserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDetailsQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AuthResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hi'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { profile?: Maybe<(
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'name'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { profile?: Maybe<(
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'name'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);


export const GetUserDetailsDocument = gql`
    query GetUserDetails {
  me {
    user {
      id
    }
  }
}
    `;

/**
 * __useGetUserDetailsQuery__
 *
 * To run a query within a React component, call `useGetUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>) {
        return Apollo.useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, baseOptions);
      }
export function useGetUserDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, baseOptions);
        }
export type GetUserDetailsQueryHookResult = ReturnType<typeof useGetUserDetailsQuery>;
export type GetUserDetailsLazyQueryHookResult = ReturnType<typeof useGetUserDetailsLazyQuery>;
export type GetUserDetailsQueryResult = Apollo.QueryResult<GetUserDetailsQuery, GetUserDetailsQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hi
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      id
      profile {
        id
        name
      }
    }
    errors {
      message
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(input: {email: $email, password: $password}) {
    user {
      id
      profile {
        id
        name
      }
    }
    errors {
      message
    }
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
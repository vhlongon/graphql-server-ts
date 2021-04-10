import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Film = {
  created?: Maybe<Scalars["Date"]>;
  director: Scalars["String"];
  edited?: Maybe<Scalars["Date"]>;
  episodeId: Scalars["Int"];
  id: Scalars["Int"];
  openingCrawl: Scalars["String"];
  producer: Scalars["String"];
  releaseDate: Scalars["String"];
  title: Scalars["String"];
};

export enum Gender {
  male = "male",
  female = "female",
}

export type Person = {
  birthYear?: Maybe<Scalars["String"]>;
  created?: Maybe<Scalars["Date"]>;
  edited?: Maybe<Scalars["Date"]>;
  eyeColor?: Maybe<Scalars["String"]>;
  gender?: Maybe<Gender>;
  hairColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
  height?: Maybe<Scalars["Float"]>;
  id: Scalars["Int"];
  mass?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  skinColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Query = {
  films?: Maybe<Array<Film>>;
  film?: Maybe<Film>;
  person?: Maybe<Person>;
  people?: Maybe<Array<Person>>;
};

export type QueryFilmsArgs = {
  sortBy?: Maybe<SortFilmsBy>;
};

export type QueryFilmArgs = {
  id: Scalars["Int"];
};

export type QueryPersonArgs = {
  id: Scalars["Int"];
};

export type QueryPeopleArgs = {
  sortBy?: Maybe<SortPeopleBy>;
};

export enum SortFilmsBy {
  releaseDate = "releaseDate",
  episodeId = "episodeId",
}

export enum SortPeopleBy {
  id = "id",
  name = "name",
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Film: ResolverTypeWrapper<Film>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Gender: Gender;
  Person: ResolverTypeWrapper<Person>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Query: ResolverTypeWrapper<{}>;
  SortFilmsBy: SortFilmsBy;
  SortPeopleBy: SortPeopleBy;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  Film: Film;
  String: Scalars["String"];
  Int: Scalars["Int"];
  Person: Person;
  Float: Scalars["Float"];
  Query: {};
  Boolean: Scalars["Boolean"];
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type FilmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Film"] = ResolversParentTypes["Film"]
> = {
  created?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  director?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  edited?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  episodeId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  openingCrawl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Person"] = ResolversParentTypes["Person"]
> = {
  birthYear?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  edited?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  eyeColor?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes["Gender"]>, ParentType, ContextType>;
  hairColor?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  height?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mass?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  skinColor?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  films?: Resolver<
    Maybe<Array<ResolversTypes["Film"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryFilmsArgs, "sortBy">
  >;
  film?: Resolver<
    Maybe<ResolversTypes["Film"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFilmArgs, "id">
  >;
  person?: Resolver<
    Maybe<ResolversTypes["Person"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPersonArgs, "id">
  >;
  people?: Resolver<
    Maybe<Array<ResolversTypes["Person"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryPeopleArgs, "sortBy">
  >;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Film?: FilmResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type GetFilmsQueryVariables = Exact<{
  sortBy?: Maybe<SortFilmsBy>;
}>;

export type GetFilmsQuery = {
  films?: Maybe<
    Array<
      Pick<
        Film,
        | "created"
        | "edited"
        | "episodeId"
        | "producer"
        | "title"
        | "releaseDate"
        | "openingCrawl"
        | "director"
        | "id"
      >
    >
  >;
};

export const GetFilmsDocument = gql`
  query GetFilms($sortBy: SortFilmsBy) {
    films(sortBy: $sortBy) {
      created
      edited
      episodeId
      producer
      title
      releaseDate
      openingCrawl
      director
      id
    }
  }
`;

/**
 * __useGetFilmsQuery__
 *
 * To run a query within a React component, call `useGetFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilmsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetFilmsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFilmsQuery, GetFilmsQueryVariables>(
    GetFilmsDocument,
    options
  );
}
export function useGetFilmsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFilmsQuery,
    GetFilmsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFilmsQuery, GetFilmsQueryVariables>(
    GetFilmsDocument,
    options
  );
}
export type GetFilmsQueryHookResult = ReturnType<typeof useGetFilmsQuery>;
export type GetFilmsLazyQueryHookResult = ReturnType<
  typeof useGetFilmsLazyQuery
>;
export type GetFilmsQueryResult = Apollo.QueryResult<
  GetFilmsQuery,
  GetFilmsQueryVariables
>;

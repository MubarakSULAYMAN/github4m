export type NavMenu = {
  name: string;
  route: string;
};

type BasicUser = {
  name: string;
  login: string;
  bio: string;
  location: string;
  email: string;
  url: string;
};

export type UserInfo = Partial<BasicUser> & {
  __typename: string;
};

type UserProfile = BasicUser & {
  company: string;
  companyHTML: string;
  avatarUrl: string;
  bioHTML: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  starredRepositories: {
    totalCount: number;
  };
  twitterUsername: string;
  websiteUrl: string;
  projects: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  packages: {
    totalCount: number;
  };
};

export type UserProfileSummary = {
  user: Partial<UserProfile>;
};

type TopicNode = {
  __typename: string;
  url: string;
  topic: {
    __typename: string;
    name: string;
  };
};

export type Repository = {
  node: {
    name: string;
    url: string;
    isPrivate: false;
    description: string;
    descriptionHTML: string;
    updatedAt: string;
    primaryLanguage: {
      color: string;
      name: string;
    };
    parent: {
      url: string;
      name: string;
    };
    licenseInfo: {
      __typename: 'License';
      name: 'Apache License 2.0';
      nickname: null;
      url: 'http://choosealicense.com/licenses/apache-2.0/';
    };
    forkCount: 0;
    stargazerCount: 0;
    repositoryTopics: {
      nodes: TopicNode[];
    };
  };
};

export type RepositorySummary = {
  // edges: Partial<Repository>[];
  edges: Repository[];
};

export type UserRepositoriesSummary = {
  user: {
    repositories: RepositorySummary;
  };
};

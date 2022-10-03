import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export function getUserProfile() {
  return useLazyQuery(
    gql`
      query userProfile($username: String!) {
        user(login: $username) {
          login
          name
          company
          companyHTML
          avatarUrl
          bio
          bioHTML
          email
          followers {
            totalCount
          }
          following {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          location
          twitterUsername
          websiteUrl
          url
          projects(first: 0) {
            totalCount
          }
          repositories(first: 0) {
            totalCount
          }
          packages(first: 0) {
            totalCount
          }
        }
      }
    `,
    {
      username: 'MubarakSULAYMAN',
    }
  );
}

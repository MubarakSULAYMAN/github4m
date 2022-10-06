import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export function getUsers() {
  return useLazyQuery(
    gql`
      query githubUsers($username: String!) {
        search(query: $username, type: USER, first: 100) {
          userCount
          edges {
            node {
              ... on User {
                name
                login
                bio
                avatarUrl
                location
                email
                url
              }
            }
          }
        }
      }
    `,
    {
      username: 'Mubarak',
    }
  );
}

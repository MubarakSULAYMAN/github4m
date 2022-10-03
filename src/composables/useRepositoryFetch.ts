import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export function getRepos() {
  return useLazyQuery(
    gql`
      query userRepositories($username: String!) {
        user(login: $username) {
          repositories(first: 48, orderBy: { field: UPDATED_AT, direction: DESC }) {
            edges {
              node {
                name
                url
                isPrivate
                description
                descriptionHTML
                updatedAt
                primaryLanguage {
                  color
                  name
                }
                parent {
                  url
                  name
                }
                forkCount
                stargazerCount
                licenseInfo {
                  name
                  nickname
                  url
                }
                repositoryTopics(first: 16) {
                  nodes {
                    url
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      username: 'MubarakSULAYMAN',
    }
  );
}

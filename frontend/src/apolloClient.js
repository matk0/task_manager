import * as ActionCable from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const cable = ActionCable.createConsumer(import.meta.env.VITE_ACTION_CABLE_URL);
const actionCableLink = new ActionCableLink({ cable });

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  actionCableLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

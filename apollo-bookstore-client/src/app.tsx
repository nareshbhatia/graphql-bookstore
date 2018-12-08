import * as React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';
import { ApolloProvider } from 'react-apollo';
import { getTheme } from './components';
import { Shell } from './shell';
import { rootStore } from './stores';
import { history } from './utils/history';

const theme = getTheme();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

// Create an http link:
const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_LINK
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_LINK,
    options: {
        reconnect: true
    }
});

// Using the ability to split links, send data to each link
// depending on what kind of operation is being sent
interface Definition {
    kind: string;
    operation?: string;
}

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation }: Definition = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

// Create the Apollo client
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                    <Provider rootStore={rootStore}>
                        <Shell />
                    </Provider>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

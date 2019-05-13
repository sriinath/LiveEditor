import * as React from 'react'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import { OpportunityContainer } from '../../Containers'

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

import { Global } from '../../common'
import { ItemWrapper } from '../ItemWrapper'
class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Global />
                <OpportunityContainer>
                    <ItemWrapper />
                </OpportunityContainer>
            </ApolloProvider>
        )
    }
}

export { App }
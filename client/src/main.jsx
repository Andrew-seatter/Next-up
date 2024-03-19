import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// DEFAULT COLOR OVERRIDES
let theme = createTheme({
  palette: {
    primary: {
      main: '#250047'
    },
    secondary: {
      main: "#6200ea",
    }
  }
})

// CUSTOM COLORS
theme = createTheme(theme, {
  palette: {
    interviewed: theme.palette.augmentColor({
      name: 'interviewed',
      color: {
        main: '#8133ee'
      }
    }),
    hired: theme.palette.augmentColor({
     name: 'hired',
    color: {
      main: '#33D6A5'
    }
    }),
    pending: theme.palette.augmentColor({
      name: 'pending',
      color: {
        main: '#fbbc05'
      }
    }),
    rejected: theme.palette.augmentColor({
      name: 'rejected',
      color: {
        main: '#ff0000'
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ApolloProvider>
)

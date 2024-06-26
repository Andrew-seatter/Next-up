import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { lighten } from '@mui/system';
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setContext } from '@apollo/client/link/context';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the httpLink
  cache: new InMemoryCache(),
});

//Lighter color for yellow
const lighterColor = lighten('#E0BC00', 0.3);

// DEFAULT COLOR OVERRIDES
let theme = createTheme({
  palette: {
    primary: {
      main: '#2E215E'
    },
    secondary: {
      main: "#5500E0",
    },
    tertiary: {
      main: "#FFA730",
    },
    quaternary: {
      main: "#A1E000",
    },
    grey: {
      main: "#f2f2f2",
    },
    yellow: {
      main: "#E0BC00",
      light:lighterColor,
    }
  }
})

// CUSTOM COLORS
theme = {
  ...theme,
  palette: {
    ...theme.palette,
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
    }),
    applied: theme.palette.augmentColor({
      name: 'applied',
      color: {
        main: '#A1E000'
      }
    }),
  }
}

const theme2 = createTheme({
  palette: {
    primary: {
      main: '#ff00ff'
    },
    secondary: {
      main: "#ff00ff",
    },
    tertiary: {
      main: "#ff00ff",
    },
    quaternary: {
      main: "#ff00ff",
    },
    yellow: {
      main: "#ff00ff",
      light:lighterColor,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
)

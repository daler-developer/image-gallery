import { render } from 'react-dom'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import ThemeProvider from '@mui/system/ThemeProvider'
import theme from './utils/theme'

render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
)

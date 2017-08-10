import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Header from './Header'
import Footer from './Footer'
import HomePage from '../containers/HomePage'
import SigninPage from '../containers/SigninPage'
import SentencePage from '../containers/SentencePage'
import WordPage from '../containers/WordPage'
import SourcePage from '../containers/SourcePage'
import NoMatch from './NoMatch'

const App = () => (
  <div>
    <Header />
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/signin' component={SigninPage} />
        <PrivateRoute
          path='/sentences'
          component={SentencePage}
        />
        <PrivateRoute
          path='/words'
          component={WordPage}
        />
        <PrivateRoute
          path='/sources'
          component={SourcePage}
        />
        <Route component={NoMatch} />
      </Switch>
    </div>
    <Footer />
  </div>
)
export default App

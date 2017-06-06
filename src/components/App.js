import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomePage from '../containers/HomePage'
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
        <Route path='/sentences' component={SentencePage} />
        <Route path='/words' component={WordPage} />
        <Route path='/sources' component={SourcePage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
    <Footer />
  </div>
)
export default App

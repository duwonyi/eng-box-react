import React from 'react'
import { Link } from 'react-router-dom'
import {
  Jumbotron,
  Button,
  Container,
  Row,
} from 'reactstrap'

const HomePage = () => (
  <div>
    <Jumbotron>
      <h1 className='display-3'>English Box</h1>
      <p className='lead'>This is a single page application for me to study English. It is built with React/Redux and runs on Amazon S3</p>
      <hr className='my-2' />
      <p>It stores sentence, word, and source.</p>
      <p className='lead'>
        <Button color='primary'>Learn More</Button>
      </p>
    </Jumbotron>
    <Container>
      <Row>
        <div className='col-md-4'>
          <h2>Sentences</h2>
          <p>
            Sentence store and review.
          </p>
          <p>
            <Button
              color='secondary'
              tag={Link}
              to='/sentences'
            >
              View sentences &raquo;
            </Button>
          </p>
        </div>
        <div className='col-md-4'>
          <h2>Words</h2>
          <p>
            Word store.
          </p>
          <p>
            <Button
              color='secondary'
              tag={Link}
              to='/words'
            >
              View words &raquo;
            </Button>
          </p>
        </div>
        <div className='col-md-4'>
          <h2>Sources</h2>
          <p>
            Source store.
          </p>
          <p>
            <Button
              color='secondary'
              tag={Link}
              to='/sources'
            >
              View sources &raquo;
            </Button>
          </p>
        </div>
      </Row>
    </Container>
  </div>
)

export default HomePage

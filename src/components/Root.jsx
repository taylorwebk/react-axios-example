import React, { Component, Fragment } from 'react'
import Posts from './Posts'
import Header from './Header'
import './styles.css'

export default class Root extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Posts />
      </Fragment>
    )
  }
}

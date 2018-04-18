import React, { Component } from 'react'
import axios from 'axios'

export default class Contenido extends Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      content: {}
    }
    this.loadContent = this.loadContent.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (this.props.cid !== prevProps.cid) {
      this.setState({
        loading: true
      })
      this.loadContent()
    }
  }
  componentDidMount() {
    this.loadContent()
  }
  loadContent() {
    const {cid} = this.props
    axios
    .get('https://jsonplaceholder.typicode.com/posts/'+cid)
    .then((res) => {
      this.setState({
        loading: false,
        content: res.data
      })
    })
  }
  render() {
    const {content, loading} = this.state
    let contenido
    if(loading){
      contenido = <div class="loader"></div>
    } else {
      contenido = <div>
        <button className="close" onClick={this.props.cerrar}>x</button>
        <p className="post"><b>TITULO: </b>{content.title}</p>
        <br />
        <p className="post"><b>CONTENIDO: </b>{content.body}</p>
      </div>
    }
    return (
      <div className="right">
        {contenido}
      </div>
    )
  }
}

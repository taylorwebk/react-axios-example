import React, { Component } from 'react'
import axios from 'axios'
import Contenido from './Contenido'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      posts: [],
      id: null
    }
    this.cargarPosts = this.cargarPosts.bind(this)
    this.setId = this.setId.bind(this)
    this.setIdNull = this.setIdNull.bind(this)
  }
  setId(id) {
    this.setState({
      id: id
    })
  }
  setIdNull() {
    this.setState({
      id: null
    })
  }
  cargarPosts() {
    this.setState({
      loading: true
    })
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      this.setState({
        loading: false,
        posts: res.data
      })
    })
  }
  render() {
    const {loading, posts, id} = this.state
    let contenido
    // PRIMER ESTADO: NO POST, NO LOADING
    if (posts.length === 0 && loading === false) {
      contenido = <h3>
        HAZ CLICK EN EL BOTON PARA CARGAR EL CONTENIDO
      </h3>
    }
    // SEGUNDO ESTADO: NO POST, SI LOADING
    if (posts.length === 0 && loading === true) {
      contenido = <div class="loader"></div>
    }
    // TERCER ESTADO: POSTS, no LOADING
    if (posts.length > 0) {
      const lista = posts.map((post, i) => (
        <li key={i}>
          <button className="ver" onClick={
            () => {
              this.setId(post.id)
            }
          }>
            VER
          </button>&nbsp;
          {post.title}
        </li>
      ))
      contenido = <ul>
        {lista}
      </ul>
    }
    return (
      <section>
        <button className="getposts" onClick={this.cargarPosts}>
          OBTENER POSTS
        </button>
        <br />
        <div className="left">
          {contenido}
        </div>
        {id == null?null:<Contenido cid={id} cerrar={this.setIdNull} />}
      </section>
    )
  }
}

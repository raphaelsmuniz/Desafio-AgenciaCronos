import React, { Component } from 'react';
import Main from '../templates/Main';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const initialState = {
  user: { name: '', imagem: '', descricao: '' },
  list: [],
};
export default class UserCrud extends Component {
  state = { ...initialState };
  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      const list = this.getUpdateList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }
  getUpdateList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }
  upDateFild(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }
  renderForm() {
    return (
      <section id="servicos" className="py-5 mb-5">
        <div className="container">
          <h3>Serviços</h3>
          <button className="btn btn-primary" onClick={(e) => this.save(e)}>
            Adicionar novo
          </button>
          <div className="form">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.user.name}
                    onChange={(e) => this.upDateFild(e)}
                    placeholder="Digite o nome do curso"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Imagem</label>
                  <input
                    type="file"
                    className="form-control"
                    name="imagem"
                    value={this.state.user.imagem}
                    onChange={(e) => this.upDateFild(e)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    className="form-control"
                    name="descricao"
                    value={this.state.user.descricao}
                    onChange={(e) => this.upDateFild(e)}
                    placeholder="Descrição do curso"
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  load(user) {
    this.setState({ user });
  }
  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdateList(user, false);
      this.setState({ list });
    });
  }
  renderTable() {
    return (
      <section id="servicos" class="py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <tabble className="table mt-5">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Imagem</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{this.renderRow()}</tbody>
              </tabble>
            </div>
          </div>
        </div>
      </section>
    );
  }
  renderRow() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.imagem}</td>
          <td>{user.descricao}</td>
          <td>
            <button
              className="btn btn-secondary m-1"
              onClick={() => this.load(user)}
            >
              editar
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={() => this.remove(user)}
            >
              excluir
            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    console.log(this.state.list);
    return (
      <Main>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}

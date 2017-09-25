import React, { Component } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      url: '',
    };
    this.submitUrl = this.submitUrl.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.clearUrl = this.clearUrl.bind(this);
  }
  submitUrl(e) {
    e.preventDefault();
    fetch(this.state.url)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const dataArray = Object.values(data);
      return dataArray.map((url) => {
        const urls = this.state.urls;
        urls.push(url);
        this.setState({ urls: urls });
      });
    })
    .catch((error) => console.log(error));
  }
  handleUrl(e) {
    this.setState({ url: e.target.value });
  }
  clearUrl(e) {
    this.setState({ url: '' });
  }
  render() {
    const urlsArray = this.state.urls;
    const urls = urlsArray.map((url) => <li><a className="tag is-success" href={url}>{url}</a></li> );
    return (
      <div className="App columns">
        <div className="column"></div>
        <div className="column is-three-quarters">
          <div className="field">
            <label className="label">Enter URL</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="https://"
                value={ this.state.url }
                onChange={ this.handleUrl }
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={ this.submitUrl }>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link">Cancel</button>
            </div>
          </div>
          <div className="content">
            <h1>URLs found on {this.state.url} </h1>
            <ul>{urls}</ul>
          </div>
        </div>
        <div className="column"></div>
      </div>
    );
  }
}

export default App;

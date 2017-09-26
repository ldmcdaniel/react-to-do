import React, { Component } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkList: [],
      htmlData: '',
      originalUrl: '',
    };
    this.submitUrl = this.submitUrl.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.resetState = this.resetState.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }
  submitUrl(e) {
    e.preventDefault();
    this.fetchUrlData();
  }
  fetchUrlData() {
    fetch(this.state.originalUrl, { 'x-requested-with': 'emma-code-challenge' })
    .then((response) => response.text())
    .then((data) => {
      this.setState({ htmlData: data });
      this.setLinkList();
    })
    .catch((error) => console.log(error));
  }
  setLinkList() {
    const aTags = document.getElementById('hidden-html').getElementsByTagName('a');
    const tagsArray = Array.from(aTags).map((url) => {
      return url.getAttribute("href");
    });
    this.setState({ linkList: tagsArray });
  }
  createMarkup(element) {
    return { __html: element };
  }
  handleUrl(e) {
    this.setState({ originalUrl: e.target.value });
  }
  resetState() {
    this.setState({ originalUrl: '' });
    this.setState({ htmlData: '' });
    this.setState({ linkList: [] });
  }
  render() {
    const linkListArray = this.state.linkList;
    const urls = linkListArray.map((url, index) =>
      <div className="column" key={ index }>
        <a className="button is-large is-info" href={ url } target="_blank">Test Link: { url }</a>
      </div> );
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
                value={ this.state.originalUrl }
                onChange={ this.handleUrl }
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={ this.submitUrl }>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link" onClick={ this.resetState }>Cancel</button>
            </div>
          </div>
          <div className="content">
            <h1>URLs found on: { this.state.originalUrl } </h1>
            <div id="hidden-html" className="is-hidden" dangerouslySetInnerHTML={ this.createMarkup(this.state.htmlData) }></div>
            <div className="column">{ urls }</div>
          </div>
        </div>
        <div className="column"></div>
      </div>
    );
  }
}

export default App;

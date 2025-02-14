import React, { Component } from 'react';
import Router from 'next/router';
import { withTranslation } from '../../helpers/i18n';
import Suggestion from './suggestion';
import './style.less';

class SearchArea extends Component {
  state = {
    searchText: ''
  };

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    this.delayTimer = null;
  }

  onSearchTextChange = e => {
    const { searchPokemonName } = this.props;
    const searchText = e.target.value;
    this.setState({ searchText });
    clearTimeout(this.delayTimer);

    if (!searchText) {
      searchPokemonName('');
      return;
    }

    this.delayTimer = setTimeout(() => {
      searchPokemonName(searchText);
    }, 500);
  };

  onSubmit = e => {
    const { searchText } = this.state;
    e.preventDefault();
    if (!searchText) {
      return;
    }
    Router.push(`/search?keyword=${searchText}`, `/search/${searchText}`).then(() => window.scrollTo(0, 0));
  };

  onSearchTextClear = () => {
    const { searchPokemonName } = this.props;
    this.setState({ searchText: '' });
    searchPokemonName('');
  };

  render() {
    const { t, data, onSuggestItemClick } = this.props;
    const { searchText } = this.state;

    return (
      <div className='search-area-component'>
        <form onSubmit={this.onSubmit}>
          <div className='input-field'>
            <input
              type='text'
              placeholder={t('Search')}
              value={searchText}
              onChange={this.onSearchTextChange}
              onFocus={this.onSearchTextChange}
            />
            {searchText && (
              <span className='clear-btn' onClick={this.onSearchTextClear}>
                <i className='fas fa-backspace' />
              </span>
            )}
          </div>
          <button type='submit' ref='submitBtn'>
            <i className='fas fa-search fa-fw' />
          </button>
          <Suggestion data={data} onSuggestItemClick={onSuggestItemClick} />
        </form>
      </div>
    );
  }
}

export default withTranslation()(SearchArea);

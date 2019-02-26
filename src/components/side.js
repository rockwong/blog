import { Link, navigate, withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import { globalHistory } from '@reach/router';
import emoji from 'emojione';

export default class Slide extends React.PureComponent {
  static propTypes = {
    siteTitle: PropTypes.string,
    list: PropTypes.array,
  };

  static defaultProps = {
    siteTitle: ``,
    list: [],
  };

  state = {
    activeNav: '',
    listObj: {},
    isOpenNav: false,
  };

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.init(nextProps);
    }
  }

  toggleMenu = e => {
    e.preventDefault();
    this.setState(state => ({ isOpenNav: !state.isOpenNav }));
  };

  itemClick = url => e => {
    e.preventDefault();
    navigate(url);
  };

  navClick = navName => e => {
    e.preventDefault();
    this.setState({ activeNav: navName });
  };

  checkIsCurrent = pathname => withPrefix(encodeURI(pathname)) === globalHistory.location.pathname;

  init = (props = this.props) => {
    let defaultActiveNav;
    const listObjWidthNavName = props.list
      .filter(item => Boolean(item.node.fields.navName))
      .reduce((obj, item, index) => {
        const navName = item.node.fields.navName;

        // init activeNav
        if (index === 0 && !this.state.activeNav) defaultActiveNav = navName;
        // format date
        const unknownDate = 'Unknown date';
        const date = item.node.frontmatter.modified;
        if (date && date !== unknownDate) {
          item.date = moment(date).format('YYYY/DD/MM HH:mm');
        } else {
          item.date = unknownDate;
        }

        // datalist zip width obj
        obj[navName] = obj[navName] || [];
        obj[navName].push(item);
        return obj;
      }, {});

    // 通过 location 判断默认 nav
    const prefixReg = new RegExp(`^${withPrefix('')}`);
    const locationName = globalHistory.location.pathname
      .replace(prefixReg, '')
      .split('/')
      .filter(Boolean)[0];
    const decodeName = decodeURI(locationName);
    if (decodeName && listObjWidthNavName[decodeName]) {
      defaultActiveNav = decodeName;
    }
    this.setState({ listObj: listObjWidthNavName, activeNav: defaultActiveNav });
  };

  render() {
    const { siteTitle } = this.props;
    const { activeNav, listObj } = this.state;
    // nav list
    const navNameList = Object.keys(listObj);
    const navList = navNameList.map((navName, index) => (
      <li className="pure-menu-item" key={index}>
        <a
          onClick={this.navClick(navName)}
          className={`pure-menu-link ${activeNav === navName ? 'active' : ''}`}
        >
          {navName}
          <span className="email-count">({listObj[navName].length})</span>
        </a>
      </li>
    ));

    // excerpt list1
    const excerptListData = listObj[activeNav] || [];
    const excerptList = excerptListData.map(item => (
      <div
        onClick={this.itemClick(item.node.fields.tagPath)}
        className={`email-item  pure-g ${
          this.checkIsCurrent(item.node.fields.tagPath)
            ? 'email-item-unread email-item-selected'
            : ''
        }`}
        key={item.node.id}
      >
        <div className="pure-u-1">
          <h5 className="email-name">
            {item.date} · {item.node.fields.navName}
          </h5>
          <h4
            className="email-subject"
            dangerouslySetInnerHTML={{ __html: emoji.toImage(item.node.frontmatter.title) }}
          />
          <p className="email-desc">{item.node.excerpt}</p>
        </div>
      </div>
    ));

    return (
      <>
        <div id="nav" className={`pure-u ${this.state.isOpenNav ? 'active' : ''}`}>
          <a href="#" className="nav-menu-button" onClick={this.toggleMenu}>
            Menu
          </a>

          <div className="nav-inner">
            <Link to="/" className="primary-button pure-button">
              {siteTitle}
            </Link>

            <div className="pure-menu">
              <ul className="pure-menu-list">
                {navList}
                <li className="pure-menu-heading">Personal</li>
                <li className="pure-menu-item">
                  <Link to="/about" className="pure-menu-link">
                    <span className="email-label-personal" />
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="list" className="pure-u-1">
          {excerptList}
        </div>
      </>
    );
  }
}

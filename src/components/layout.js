import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Side from './side';
import './pure.css';
import './email.css';

const Layout = props => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                modified
              }
              fields {
                slug
                navName
                tagPath
              }
              excerpt
            }
          }
        }
      }
    `}
    render={data => (
      <div id="layout" className="content pure-g">
        <Side siteTitle={data.site.siteMetadata.title} list={data.allMarkdownRemark.edges} />
        <div id="main" className="pure-u-1">
          {props.children}
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

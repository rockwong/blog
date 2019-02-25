/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const tags = _.get(node, 'frontmatter.tags', []);
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
    });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    if (tags.some(tag => tag.includes('Notebooks'))) {
      tags
        .filter(tag => tag.includes('Notebooks'))
        .forEach(str => {
          const noteStr = str.replace(/Notebooks\//g, '');
          const navName = noteStr.split('/')[0];
          const tagPath = slug.replace(/notes/g, noteStr);
          console.log('tagPath==', tagPath);
          createNodeField({
            node,
            name: `navName`,
            value: navName,
          });
          createNodeField({
            node,
            name: `tagPath`,
            value: tagPath,
          });
        });
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              tagPath
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fields && node.fields.tagPath) {
        createPage({
          path: node.fields.tagPath,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            tagPath: node.fields.tagPath,
          },
        });
      }
    });
  });
};

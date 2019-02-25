---
tags: [Notebooks/Gatsby]
title: Gatsby 知识集
created: '2019-02-25T14:16:20.503Z'
modified: '2019-02-25T14:22:11.049Z'
---

#  Gatsby 知识集

##基本目录结构


```sh
.
├── gatsby-config.js
├── package.json
└── src
    ├── html.jsx
    ├── pages
    │   ├── index.jsx
    │   └── posts
    │       ├── 01-01-2017
    │       │   └── index.md
    │       ├── 01-02-2017
    │       │   └── index.md
    │       └── 01-03-2017
    │           └── index.md
    ├── templates
    │   └── post.jsx
    │
    └── layouts
        └── index.jsx
```

## 模板文件

示例 ：`src/templates/post.jsx` 
将以此页面渲染 markdown 文件。


```jsx
import React from "react";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
```


## 布局组件

用于设置网站公用部分，如果header、footer，可以根据location 属性筛选是否应用的模板。
`src/layouts/index.jsx` 

```jsx
import React from "react";
import Navigation from "../components/Navigation/Navigation.jsx";

export default class Template extends React.Component {
  render() {
    if (this.props.location.pathname !== "/") {
      return <Navigation>{this.props.children()}</Navigation>;
    } else {
      return this.props.children();
    }
  }
}
```

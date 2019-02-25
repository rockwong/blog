import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1> Woooooo!</h1>
    <p>网站基于 Gatsby 搭建， 主要采用 React 全家桶 、Graphql、Pure.css</p>
    <p>文件基于 Markdown</p>
    <p>
      网站的主要作用是私人笔记，内容比较碎片和简单，内容来源是项目中的问题、开源文档、技术博客。引用地址大都标记来源，如有遗漏欢迎联系。
    </p>
    <p>
      笔记软件采用开源跨平台的笔记软件 <a href="https://github.com/notable/notable">notable</a>
    </p>
    <p> 利用github 做笔记的版本控制和发布生成静态网站，文件部署在 github page 上</p>
    <p>个人邮箱: rockwong.cn@gmail.com</p>
  </Layout>
);

export default IndexPage;

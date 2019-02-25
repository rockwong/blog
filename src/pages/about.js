import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SecondPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>关于网站</h1>
    <p>原网站利用 MWeb 发布并记录 旧地址：http://rockwong.com/blog/</p>
    <p>
      由于 MWeb 不夸平台，在使用windows的时候无法使用，版本升级后旧的key也失效了，所以转向开源的
      notable 。
    </p>
    <p>使用 Gatsby 简单搭建了一个 "在线预览版的笔记 Blog", 哈哈。。。</p>
  </Layout>
);

export default SecondPage;

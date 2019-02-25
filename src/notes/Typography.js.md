---
tags: [Notebooks/Gatsby]
title: Typography.js
created: '2019-02-25T14:16:20.509Z'
modified: '2019-02-25T14:22:11.055Z'
---

# Typography.js

构建网站css的javascript库。

Github: https://github.com/kyleamathews/typography.js
Demo : http://kyleamathews.github.io/typography.js/


## 示例代码

`npm install typography`

```js
import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()

```

# Themes

`npm install --save typography-theme-funston`

 可以引入主题样式，并可以自定义样式

```js
import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

// 覆盖样式方法
funstonTheme.baseFontSize = '22px' // was 20px.
funstonTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'h2,h3': {
    marginBottom: rhythm(1/2),
    marginTop: rhythm(2),
  }
})

const typography = new Typography(funstonTheme)

```

## 在gatsby中

`npm install --save gatsby-plugin-typography`

配置 `gatsby-config.js`


```js
module.exports = {
  plugins: [`gatsby-plugin-typography`],
};
```

配置主题
`src/utils`

```js
import Typography from "typography";
import bootstrapTheme from "typography-theme-bootstrap";

const typography = new Typography(bootstrapTheme);

export default typography;
```

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
};
```

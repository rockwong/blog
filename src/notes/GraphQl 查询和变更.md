---
tags: [Notebooks/Gatsby]
title: GraphQl 查询和变更
created: '2019-02-25T14:16:20.506Z'
modified: '2019-02-25T14:22:11.052Z'
---

# GraphQl 查询和变更

## 查询字段 和 参数


```
{
 # 查询可以有参数
  hero(id: "1000") {
    name
   
    # 查询参数可以是：标量（scalar）
    height(unit: FOOT)
    friends {
      name
    }
  }
  
  # 查询的字段名称可以重命名 
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

## 片段（Fragments）

正反派主角及其友军分为两拨，使用`fragment` 解决查询字段重复的问题。


```
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

## 操作名称（Operation name）

上述示例简写句法，省略了 query 关键字和查询名称。

生产环境中使用好处：`减少代码歧义` `方便调试` `服务器端日志记录`

操作类型可以是：`query` `mutation` `subscription`


```
# 操作类型：query
# 操作名称：HeroNameAndFriends
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

## 变量（Variables）
变量名 `$episode`
变量类型 `Episode`
默认值 `JEDI`

声明的变量都必须是`标量`、`枚举型`或者`输入对象`类型
如果想要传递一个复杂对象到一个字段上，你必须知道服务器上其匹配的类型

```
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}

# VARIABLES
{
  "episode": "JEDI"
}
```

## 指令（Directives）
用一个变量动态的改变查询结构，例如：概括视图和详情视图等功能。

* `@include(if: Boolean)` 仅在参数为 `true` 时，包含此字段
* `@skip(if: Boolean)` 如果参数为 `true`，跳过此字段。

```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
# VARIABLES
{
  "episode": "JEDI",
  "withFriends": false
}
```

## 变更（Mutations）

约定来规范任何导致写入的操作都应该显式通过变更（mutation）来发送。


```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
# VARIABLES
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

注意 `createReview` 字段如何返回了新建的 `review` 的 `stars` 和 `commentary` 字段。这在变更已有数据时特别有用，例如，当一个字段自增的时候，我们可以在一个请求中变更并查询这个字段的新值。

## 变更中的多个字段

**查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。**


## 内联片段（Inline Fragments）

如果你查询的字段返回的是`接口`或者`联合类型`，那么你可能需要使用`内联片段`来取出下层具体类型的数据

```
# query 变量$ep，类型Episode，！为必选
query HeroForEpisode($ep: Episode!) {

  # 筛选参数：episode,值：$ep
  hero(episode: $ep) {
    name
    
    # episode类型为Droid，显示primaryFunction
    ... on Droid {
      primaryFunction
    }
    
     # episode类型为Human，显示height
    ... on Human {
      height
    }
  }
}
```

## 元字段（Meta fields）

从GraphQL 服务获得类型，在查询的任何位置请求元字段 `__typename`


```
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}

## 结果

{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```

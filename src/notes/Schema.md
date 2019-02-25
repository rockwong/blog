---
tags: [Notebooks/Gatsby]
title: Schema
created: '2019-02-25T14:16:20.508Z'
modified: '2019-02-25T14:22:11.053Z'
---

# Schema


## 对象类型和字段（Object Types and Fields）

它就表示你可以从服务上获取到什么类型的对象，以及这个对象有什么字段


```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

* `Character` 是一个 `GraphQL对象类型`，表示其是一个拥有一些字段的类型。 `schema` 中的大多数类型都会是对象类型。
* `name` 和 `appearsIn` 是 `Character` 类型上的`字段`。这意味着在一个操作 `Character` 类型的 GraphQL 查询中的任何部分，都只能出现 `name` 和 `appearsIn` 字段。
* `String` 是内置的`标量类型`之一 —— 标量类型是解析到单个标量对象的类型，无法在查询中对它进行次级选择。后面我们将细述标量类型。
* `String!` 表示这个字段是`非空的`，GraphQL 服务保证当你查询这个字段后总会给你返回一个值。在类型语言里面，我们用一个感叹号来表示这个特性。
* `[Episode]!` 表示一个 `Episode` 数组。因为它也是非空的，所以当你查询 `appearsIn` 字段的时候，你也总能得到一个数组（零个或者多个元素）。


## 参数（Arguments）


```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```
`length` 字段定义了一个参数，`unit`

参数可能是必选或者可选的，当一个参数是可选的，可以定义一个默认值 —— 如果 `unit` 参数没有传递，那么它将会被默认设置为 `METER`


## 查询和变更类型（The Query and Mutation Types）
`schema` 内有两个特殊类型

```
# 内置特殊类型
schema {
  query: Query
  mutation: Mutation
}

# 简单的查询示例
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}

# 需要配置Query 类型
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}

```

## 标量类型（Scalar Types）

解析到具体数据的类型，示例查询中 `name` 和 `appearsIn` 将解析到标量类型。

GraphQL 自带一组默认标量类型
 * `Int`：有符号 32 位整数。
 * `Float`：有符号双精度浮点值。
 * `String`：UTF‐8 字符序列。
 * `Boolean`：`true` 或者 `false`。
 * `ID`：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类型使用和 String 一样的方式序列化；然而将其定义为 ID 意味着并不需要人类可读型。


```
{
  hero {
    name
    appearsIn
  }
}
```


```
# 自定义标量类型
scalar Date
```

## 枚举类型 (Enumeration Types）

限制在一个特殊的可选值集合内

1. 验证这个类型的任何参数是可选值的的某一个
2. 与类型系统沟通，一个字段总是一个有限值集合的其中一个值


```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```
schema 的哪处使用了 Episode，都可以肯定它返回的是 NEWHOPE、EMPIRE 和 JEDI 之一


## 接口（Interfaces）

一个`接口`是一个抽象类型，它包含某些字段，而对象类型必须包含这些字段，才能算实现了这个接口。

`Character` 接口用以表示《星球大战》三部曲中的任何角色：


```
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

```

`实现 Character` 的类型都要具有这些字段，并有对应参数和返回类型.

```
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

两个类型都具备 `Character` 接口的所有字段，但也引入了其他的字段 `totalCredits`、`starships` 和 `primaryFunction`，这都属于特定的类型的角色。

查询一个只存在于特定对象类型上的字段，你需要使用内联片段


```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
# VARIABLES
{
  "ep": "JEDI"
}
```


## 联合类型（Union Types）

联合类型和接口十分相似，但是它并不指定类型之间的任何共同字段。

```
union SearchResult = Human | Droid | Starship
```
任何返回一个 `SearchResult` 类型的地方，都可能得到一个 `Human`、`Droid` 或者 `Starship`。注意，联合类型的成员需要是具体对象类型；你不能使用接口或者其他联合类型来创造一个联合类型。

要查询一个返回 `SearchResult` 联合类型的字段，那么你得使用条件片段才能查询任意字段。


```
{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```


## 输入类型（Input Types）

看上去和常规对象一模一样，除了关键字是 `input` 而不是 `type`

```
input ReviewInput {
  stars: Int!
  commentary: String
}
```

引用示例


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
输入对象类型上的字段本身也可以指代输入对象类型，但是你不能在你的 schema 混淆输入和输出类型。输入对象类型的字段当然也不能拥有参数。

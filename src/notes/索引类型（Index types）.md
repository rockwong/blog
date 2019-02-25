---
tags: [Notebooks/Typescript]
title: 索引类型（Index types）
created: '2019-02-25T14:15:46.588Z'
modified: '2019-02-25T14:31:11.246Z'
---

# 索引类型（Index types）

js 函数

```js
function pluck(o, names) {
    return names.map(n => o[n]);
}
```

TypeScript 中声明和使用


```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

### 索引类型查询操作符
 `keyof T` ,上例为已知公共属性名的联合

`let personProps: keyof Person; // 'name' | 'age'`

### 索引访问操作符

`T[K]` 需要确保 `K extends keyof T`

```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

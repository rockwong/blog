---
tags: [Notebooks/Tools]
title: vscode-javascript snippets
created: '2019-02-25T14:39:35.374Z'
modified: '2019-02-25T14:40:46.478Z'
---

# vscode-javascript snippets



## Snippets

Below is a list of all available snippets and the triggers of each one. The **⇥** means the `TAB` key.

### Import and export
| Trigger  | Content |
| -------: | ------- |
| `imp→`   | imports entire module `import fs from 'fs';`|
| `imn→`   | imports entire module without module name `import 'animate.css'` |
| `imd→`   | imports only a portion of the module using destructing  `import {rename} from 'fs';` |
| `ime→`   | imports everything as alias from the module `import * as localAlias from 'fs';` |
| `ima→`   | imports only a portion of the module as alias `import { rename  as localRename } from 'fs';` |
| `enf→`   | exports name function `export const log = (parameter) => { console.log(parameter);};` |
| `edf→`   | exports default function `export default  (parameter) => { console.log(parameter);};` |
| `ecl→`   | exports default class `export default class Calculator { };` |
| `ece→`   | exports default class by extending a base one `export default class Calculator extends BaseClass { };` |

### Class helpers
| Trigger  | Content |
| -------: | ------- |
| `con→`   | adds default constructor in the class `constructor() {}`|
| `met→`   | creates a method inside a class `add() {}` |
| `pge→`   | creates a getter property `get propertyName() {return value;}` |
| `pse→`   | creates a setter property `set propertyName(value) {}` |

### Various methods
| Trigger  | Content |
| -------: | ------- |
| `fre→`   | forEach loop in ES6 syntax `array.forEach(currentItem => {})`|
| `fof→`   | for ... of loop `for(const item of object) {}` |
| `fin→`   | for ... in loop `for(const item in object) {}` |
| `anfn→`  | creates an anonymous function `(params) => {}` |
| `nfn→`   | creates a named function `const add = (params) => {}` |
| `dob→`   | destructing object syntax `const {rename} = fs` |
| `dar→`   | destructing array syntax `const [first, second] = [1,2]` |
| `sti→`   | set interval helper method `setInterval(() => {});` |
| `sto→`   | set timeout helper method `setTimeout(() => {});` |
| `prom→`  | creates a new Promise `return new Promise((resolve, reject) => {});`|

### Console methods
| Trigger  | Content |
| -------: | ------- |
| `cas→`   | console alert method `console.assert(expression, object)`|
| `ccl→`   | console clear `console.clear()` |
| `cco→`   | console count `console.count(label)` |
| `cdi→`   | console dir `console.dir` |
| `cer→`   | console error `console.error(object)` |
| `cgr→`   | console group `console.group(label)` |
| `cge→`   | console groupEnd `console.groupEnd()` |
| `clg→`   | console log `console.log(object)` |
| `ctr→`   | console trace `console.trace(object)` |
| `cwa→`   | console warn `console.warn` |
| `cin→`   | console info `console.info` |
| `clt→`   | console table `console.table` |

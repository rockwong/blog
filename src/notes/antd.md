---
tags: [Notebooks/React]
title: antd
created: '2019-02-25T14:00:31.021Z'
modified: '2019-02-25T14:02:51.519Z'
---

# antd
##Form    
###自定义验证

```js
rules: [
    { validator: (rule, value, callback)=>{
        if (parseFloat(value) > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    }}
]
```

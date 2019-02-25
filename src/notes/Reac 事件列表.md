---
tags: [Notebooks/React]
title: Reac 事件列表
created: '2019-02-25T14:00:31.024Z'
modified: '2019-02-25T14:02:51.512Z'
---

# Reac 事件列表

> https://segmentfault.com/a/1190000005182270

##粘贴板事件
 {
    事件名称：onCopy onCut onPaste
    属性：DOMDataTransfer clipboardData
}

##编辑事件 
{
    事件名称：onCompositionEnd onCompositionStart onCompositionUpdate
    属性：string data
}

##键盘事件
 {
    事件名称：onKeyDown onKeyPress onKeyUp
    属性： {
        boolean altKey
        number charCode
        boolean ctrlKey
        boolean getModifierState(key)
        string key
        number keyCode
        string locale
        number location
        boolean metaKey
        boolean repeat
        boolean shiftKey
        number which
    }
}

// 焦点事件除了表单元素以外，可以应用到所有元素中
##焦点事件
 {
    名称：onFocus onBlur
    属性：DOMEventTarget relatedTarget
}

##表单事件 
{
    名称：onChange onInput onSubmit
}

##鼠标事件
 {
    名称：{
        onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp
    }
    属性：{
        boolean altKey
        number button
        number buttons
        number clientX
        number clientY
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        number pageX
        number pageY
        DOMEventTarget relatedTarget
        number screenX
        number screenY
        boolean shiftKey
    }
}

##选择事件 
{
    名称：onSelect
}

##触摸事件
 {
    名称：onTouchCancel onTouchEnd onTouchMove onTouchStart
    属性：{
        boolean altKey
        DOMTouchList changedTouches
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        boolean shiftKey
        DOMTouchList targetTouches
        DOMTouchList touches
    }
}

##UI 事件
 {
    名称：onScroll
    属性：{
        number detail
        DOMAbstractView view
    }
}

##滚轮事件
 {
    名称：onWheel
    属性：{
        number deltaMode
        number deltaX
        number deltaY
        number deltaZ
    }
}

##媒体事件
 {
    名称：{
        onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting
    }
}

##图像事件
 {
    名称：onLoad onError
}

##动画事件 
{
    名称：onAnimationStart onAnimationEnd onAnimationIteration
    属性：{
        string animationName
        string pseudoElement
        float elapsedTime
    }
}

##渐变事件 
{
    名称：onTransitionEnd
    属性： {
        string propertyName
        string pseudoElement
        float elapsedTime
    }
}

##onChange 事件
和普通 HTML 中的 onChange 事件不同， 在原生组件中，只有 input 元素失去焦点才会触发 onChange 事件， 在 React 中，只要元素的值被修改就会触发 onChange 事件。

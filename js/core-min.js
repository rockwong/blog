$(document).ready(function() {
  var webURL = window.location.href;
  var splitFlag = 'http://';
  if (webURL.substring(0, 5) === 'https') {
    splitFlag = 'https://';
  }
  // var user = webURL.split(splitFlag)[1].split(".")[0];
  // var user = 'yanghanqing';
  var user = 'rockwong';
  // var blogListURL =
  //   'https://api.github.com/repos/' + user + '/' + user + '.github.io/contents/blog';
  // readmeURL =
  //   'https://raw.githubusercontent.com/' + user + '/' + user + '.github.io/master/README.md';
  var blogListURL =
    'https://api.github.com/repos/' + user + '/blog/contents/blog';
  readmeURL =
    'https://raw.githubusercontent.com/' + user + '/' + user + '.github.io/dev/README.md';

  $('#header').text(user + "'s Blog");
  $('#commentsList').removeAttr('data_comments_url');

  var titleString = getTitleString();

  //set Blog list
  $.getJSON(blogListURL, function(json) {
    for (var i = 0; i < json.length; i++) {
      var name = json[i].name; // Blog title
      var blogURL = json[i].download_url; //Blog Raw Url
      // add blog list elements
      var new_li = $('<li></li>');
      var new_a = $('<a></a>');

      var type = 'markdown';
      // delete '.md'
      if (name.substr(-3, 3) === '.md') {
        name = name.substr(0, name.length - 3);
      } else if (name.substr(-5, 5) === '.html') {
        name = name.substr(0, name.length - 5);
        type = 'html';
      }
      // console.log(name);
      // console.log(titleString);
      if (name === titleString) {
        $('#title').text(name);
        readmeURL = blogURL;
      }

      new_a.text(name);
      //update content
      new_a.attr('data_blogURL', blogURL);
      new_a.attr('data_name', name);
      //new_a.attr("href", "?title=" + name);
      new_a.attr('href', '#');
      new_a.attr('data_type', type);
      new_a.attr('onclick', 'event.preventDefault();setBlogTxt(this)');
      new_li.append(new_a);
      $('#nav').append(new_li);
      $('#nav2').append(new_li.clone());
    }

    //set readme
    $.get(readmeURL, function(result) {
      $('#title').show();
      $('#article').html('');

      testEditormdView = editormd.markdownToHTML('article', {
        markdown: result, //+ "\r\n" + $("#append-test").text(),
        // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe', // you can filter tags decode
        //toc             : false,
        tocm: true, // Using [TOCM]
        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji: true,
        taskList: true,
        tex: true, // 默认不解析
        flowChart: true, // 默认不解析
        sequenceDiagram: true, // 默认不解析
      });
    });
  });
});

function setBlogTxt(obj) {
  // 隐藏Button
  if (!$('#btnNav').is(':hidden')) $('#btnNav').click();

  obj = $(obj);
  var blogName = obj.attr('data_name');
  var blogURL = obj.attr('data_blogURL');
  var type = obj.attr('data_type');
  $('#title').text(blogName);
  $('#article').html('loading . . .');
  history.pushState({}, '', '/home.html?title=' + blogName); // 切换浏览器地址

  // set blog content
  $.get(blogURL, function(result) {
    $('#title').show();
    if (type == 'markdown') {
      $('#article').html('');

      testEditormdView = editormd.markdownToHTML('article', {
        markdown: result, //+ "\r\n" + $("#append-test").text(),
        // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe', // you can filter tags decode
        //toc             : false,
        tocm: true, // Using [TOCM]
        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji: true,
        taskList: true,
        tex: true, // 默认不解析
        flowChart: true, // 默认不解析
        sequenceDiagram: true, // 默认不解析
      });
    } else {
      $('#title').hide();
      $('#article').html(result);
    }
  });
}

function getTitleString() {
  var reg = new RegExp('(^|&)' + 'title' + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}



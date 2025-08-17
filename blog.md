---
layout: with-nav
title: 文章列表
---

<h1 style="display:none">文章列表</h1> <!-- 想保留語意就留這行，純視覺可刪 -->

{% assign total = site.posts | size %}
<p style="color:#6b7280; margin:6px 0 12px;">共 {{ total }} 篇文章</p>

<ul id="post-list">
{% for post in site.posts %}
  <li
    data-tags="{% if post.tags %}{{ post.tags | join: ',' | escape }}{% endif %}"
    style="margin-bottom:12px;"
  >
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>
      ({{ post.date | date: "%Y-%m-%d" }})
      {% if post.tags and post.tags.size > 0 %}｜標籤：{{ post.tags | join: ', ' }}{% endif %}
    </small>
  </li>
{% endfor %}
</ul>

<script>
// 讀取網址參數並篩選（tag）
// 用法：/blog?tag=Jekyll
(function () {
  var params = new URLSearchParams(location.search);
  var tag = params.get('tag');
  var list = document.getElementById('post-list');
  if (!list) return;

  function showFilterInfo(text) {
    var p = document.createElement('p');
    p.style.margin = '0 0 8px';
    p.innerHTML = '目前篩選：<strong>' + text + '</strong>　<a href="' + (location.pathname) + '">清除</a>';
    list.parentNode.insertBefore(p, list);
  }

  if (tag) {
    var wantTag = decodeURIComponent(tag).toLowerCase();
    Array.from(list.children).forEach(function (li) {
      var tags = (li.getAttribute('data-tags') || '').toLowerCase().split(',');
      var has = tags.map(function(s){return s.trim();}).includes(wantTag);
      li.style.display = has ? '' : 'none';
    });
    showFilterInfo('標籤 = ' + tag);
  }
})();
</script>

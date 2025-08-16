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
    data-category="{% if post.categories %}{{ post.categories | join: ',' | escape }}{% endif %}"
    data-tags="{% if post.tags %}{{ post.tags | join: ',' | escape }}{% endif %}"
    style="margin-bottom:12px;"
  >
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>
      ({{ post.date | date: "%Y-%m-%d" }})
      {% if post.categories and post.categories.size > 0 %}｜分類：{{ post.categories | join: '、' }}{% endif %}
      {% if post.tags and post.tags.size > 0 %}｜標籤：{{ post.tags | join: ', ' }}{% endif %}
    </small>
  </li>
{% endfor %}
</ul>

<script>
// 讀取網址參數並篩選（category / tag）
// 用法：/blog?category=技術  或 /blog?tag=Jekyll
(function () {
  var params = new URLSearchParams(location.search);
  var cat = params.get('category');
  var tag = params.get('tag');
  var list = document.getElementById('post-list');
  if (!list) return;

  function showFilterInfo(text) {
    var p = document.createElement('p');
    p.style.margin = '0 0 8px';
    p.innerHTML = '目前篩選：<strong>' + text + '</strong>　<a href="' + (location.pathname) + '">清除</a>';
    list.parentNode.insertBefore(p, list);
  }

  if (cat) {
    var want = decodeURIComponent(cat).toLowerCase();
    Array.from(list.children).forEach(function (li) {
      var v = (li.getAttribute('data-category') || '').toLowerCase().split(',');
      var has = v.map(function(s){return s.trim();}).includes(want);
      li.style.display = has ? '' : 'none';
    });
    showFilterInfo('分類 = ' + cat);
    return; // 若同時有 cat 與 tag，就以 cat 為主
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

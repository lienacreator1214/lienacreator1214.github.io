---
layout: with-nav
title: 文章列表
---

<h1>文章列表</h1>
{% assign total = site.posts | size %}
<p style="color:#6b7280; margin-top:6px;">共 {{ total }} 篇文章</p>
<p style="color:#6b7280; margin:0 0 12px;">以下依日期由新到舊排列</p>


{% comment %}
<p>
  {% assign cats = site.posts | map: "category" | uniq | sort %}
  分類：
  <a href="{{ '/blog' | relative_url }}">全部</a>
  {% for c in cats %}
    {% if c %}
      · <a href="{{ '/blog' | relative_url }}?category={{ c | uri_escape }}">{{ c }}</a>
    {% endif %}
  {% endfor %}
</p>

<p>
  {% assign alltags = site.posts | map: "tags" | compact | join: "," | split: "," | uniq | sort %}
  標籤：
  <a href="{{ '/blog' | relative_url }}">全部</a>
  {% for t in alltags %}
    {% if t != "" %}
      · <a href="{{ '/blog' | relative_url }}?tag={{ t | strip | uri_escape }}">{{ t | strip }}</a>
    {% endif %}
  {% endfor %}
</p>
{% endcomment %}
<ul id="post-list">
{% for post in site.posts %}
  <li
    data-category="{{ post.category | escape }}"
    data-tags="{% if post.tags %}{{ post.tags | join: ',' | escape }}{% endif %}"
    style="margin-bottom:12px;"
  >
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>
      ({{ post.date | date: "%Y-%m-%d" }})
      {% if post.category %}｜分類：{{ post.category }}{% endif %}
      {% if post.tags and post.tags.size > 0 %}｜標籤：{{ post.tags | join: ', ' }}{% endif %}
    </small>
  </li>
{% endfor %}
</ul>

<script>
// 讀取網址參數並篩選（支援 category 與 tag）
// 用法：/blog?category=技術  或 /blog?tag=Jekyll
(function () {
  var params = new URLSearchParams(location.search);
  var cat = params.get('category');
  var tag = params.get('tag');
  var list = document.getElementById('post-list');
  if (!list) return;

  function showFilterInfo(text) {
    var p = document.createElement('p');
    p.innerHTML = '目前篩選：<strong>' + text + '</strong>　<a href="' + (location.pathname) + '">清除</a>';
    list.parentNode.insertBefore(p, list);
  }

  if (cat) {
    var want = decodeURIComponent(cat).toLowerCase();
    Array.from(list.children).forEach(function (li) {
      var v = (li.getAttribute('data-category') || '').toLowerCase();
      li.style.display = (v === want) ? '' : 'none';
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

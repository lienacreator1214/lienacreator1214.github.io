---
layout: with-nav
title: 文章列表
---

<h1>文章列表</h1>

<!-- 可點的分類快速連結（建議保留） -->
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
// 讀取網址參數並篩選
(function () {
  var params = new URLSearchParams(location.search);
  var cat = params.get('category');   // 之後我們也會支援 tag
  var list = document.getElementById('post-list');
  if (!list) return;

  if (cat) {
    // 大小寫一致化
    var want = decodeURIComponent(cat).toLowerCase();
    Array.from(list.children).forEach(function (li) {
      var v = (li.getAttribute('data-category') || '').toLowerCase();
      li.style.display = (v === want) ? '' : 'none';
    });
    // 顯示目前篩選
    var p = document.createElement('p');
    p.innerHTML = '目前篩選：<strong>' + cat + '</strong>　<a href="' + (location.pathname) + '">清除</a>';
    list.parentNode.insertBefore(p, list);
  }
})();
</script>

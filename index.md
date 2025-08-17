---
layout: page-with-nav
title: 首頁
---
<style>
/* 讓列表更乾淨 */
ul.post-list { list-style: none; padding: 0; margin: 1rem 0; }
ul.post-list li {
  border: 1px solid #e5e7eb; /* 淺灰邊框 */
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
  transition: transform .08s ease, box-shadow .08s ease;
}
ul.post-list li:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,.06);
}
ul.post-list a { text-decoration: none; font-weight: 600; }
ul.post-list a:hover { text-decoration: underline; }
ul.post-list small { color: #6b7280; } /* 次要文字 */
ul.post-list p { margin: 8px 0 0; color: #374151; }
</style>

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <small>({{ post.date | date: "%Y-%m-%d" }})</small>
    <p>{{ post.excerpt }}</p>
  </li>
{% endfor %}
</ul>

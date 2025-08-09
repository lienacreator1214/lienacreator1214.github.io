---
layout: default
title: 首頁
---

# 我的文章

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <small>({{ post.date | date: "%Y-%m-%d" }})</small>
    <p>{{ post.excerpt }}</p>
  </li>
{% endfor %}
</ul>

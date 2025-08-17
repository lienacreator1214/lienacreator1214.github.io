---
layout: page-with-nav
title: 標籤
---

<h1 style="display:none">標籤</h1>

<ul>
{% assign tags_all = site.tags | sort %}
{% for t in tags_all %}
  {% assign tag_name = t[0] %}
  {% assign posts_in_tag = t[1] %}
  <li><a href="{{ '/blog' | relative_url }}?tag={{ tag_name | uri_escape }}">{{ tag_name }}</a> ({{ posts_in_tag | size }})</li>
{% endfor %}
</ul>

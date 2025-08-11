---
layout: with-nav
title: 標籤
---

<h1>標籤</h1>
<ul>
  {% assign alltags = site.posts | map: "tags" | compact | join: "," | split: "," | uniq | sort %}
  {% for t in alltags %}
    {% if t != "" %}
      <li><a href="{{ '/blog' | relative_url }}?tag={{ t | strip | uri_escape }}">{{ t | strip }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

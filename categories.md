---
layout: with-nav
title: 分類
---

<p style="color:#6b7280; margin-top:6px;">ㅤ</p>
<ul>
  {% assign cats = site.posts | map: "category" | uniq | sort %}
  {% for c in cats %}
    {% if c %}
      <li><a href="{{ '/blog' | relative_url }}?category={{ c | uri_escape }}">{{ c }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

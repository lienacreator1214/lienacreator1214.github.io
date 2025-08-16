---
layout: with-nav
title: 分類
---

<h1 style="display:none">分類</h1>

<ul>
{% assign has_any = false %}
{% for pair in site.categories %}
  {% assign cat_name = pair[0] %}
  {% assign posts_in_cat = pair[1] %}
  {% if posts_in_cat.size > 0 %}
    {% assign has_any = true %}
    <li><a href="{{ '/blog' | relative_url }}?category={{ cat_name | uri_escape }}">{{ cat_name }}</a> ({{ posts_in_cat.size }})</li>
  {% endif %}
{% endfor %}
</ul>

{% unless has_any %}
  <!-- 後備：舊文還在用單數 category -->
  <ul>
  {% assign cats = site.posts | map: "category" | compact | uniq | sort %}
  {% for c in cats %}
    <li><a href="{{ '/blog' | relative_url }}?category={{ c | uri_escape }}">{{ c }}</a></li>
  {% endfor %}
  </ul>
{% endunless %}

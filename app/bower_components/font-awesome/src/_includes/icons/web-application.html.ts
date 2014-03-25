module web-application { export var html =  '<section id="web-application">  <h2 class="page-header">Web Application Icons</h2>  <div class="row fontawesome-icon-list">    {% assign icons_web_application = icons | expand_aliases | category:"Web Application Icons" | sort_by:\'class\' %}    {% for icon in icons_web_application %}      <div class="fa-hover col-md-3 col-sm-4"><a href="{{ page.relative_path }}icon/{{ icon.id }}"><i class="fa fa-{{ icon.class }}"></i> fa-{{ icon.class }}{% if icon.alias_of %} <span class="text-muted">(alias)</span>{% endif %}</a></div>    {% endfor %}  </div></section>' } 
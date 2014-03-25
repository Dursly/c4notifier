module text-editor { export var html =  '<section id="text-editor">  <h2 class="page-header">Text Editor Icons</h2>  <div class="row fontawesome-icon-list">    {% assign icons_text_editor = icons | expand_aliases | category:"Text Editor Icons" | sort_by:\'class\' %}    {% for icon in icons_text_editor %}      <div class="fa-hover col-md-3 col-sm-4"><a href="{{ page.relative_path }}icon/{{ icon.id }}"><i class="fa fa-{{ icon.class }}"></i> fa-{{ icon.class }}{% if icon.alias_of %} <span class="text-muted">(alias)</span>{% endif %}</a></div>    {% endfor %}  </div></section>' } 
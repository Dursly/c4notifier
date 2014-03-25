module new-features { export var html =  '{% capture stripe_ad_content %}<p class="lead">  Font Awesome is always getting a little awesome-er. So here\'s what\'s new in the latest version, Font Awesome  {{ site.fontawesome.minor_version }}. Have some ideas for new features?  <a href="{{ page.relative_path }}community/">Help contribute</a>.</p>{% endcapture %}{% include stripe-ad.html %}<section id="whats-new" class="feature-list">  <div class="row">    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-file-text-o"></i> Completely Rewritten</h4>      Everything re-written from the ground up for speed and simplicity.    </div>    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-fighter-jet"></i> CSS Best Practices</h4>      New icon base class allows simpler CSS, faster rendering, and easier control.    </div>    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-terminal"></i> New Icon Names</h4>      Icons have been renamed to improve consistency and predictability.    </div>    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-thumbs-o-up"></i> Bootstrap 3</h4>      Font Awesome {{ site.fontawesome.minor_version }} is fully tested and compatible with Bootstrap 3.    </div>    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-code"></i> Better Compatibility</h4>      Font Awesome is now more compatible with all web frameworks, including Foundation.    </div>    <div class="col-md-4 col-sm-6">      <h4><i class="fa fa-rub"></i> {{ icons | version:site.fontawesome.minor_version | size }} New Icons in {{ site.fontawesome.minor_version }}</h4>      Requested by the active community on the <a href="{{ site.fontawesome.github.url }}">Font Awesome GitHub project</a>.    </div>  </div></section>' } 
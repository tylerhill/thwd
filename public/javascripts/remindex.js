jQuery(function($) {

  $(window).load(function() {
    
    alert(posts[0]);

    $('#grid').masonry({
      itemSelector: '.item',
      gutter: 10,
      columnWidth: 250
    });

    $(window).scroll(function() {
      if(this.timeoutId)
        window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(function() {

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
        }

      }, 200);
    });


  });

});

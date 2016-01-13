jQuery(function($) {
  $(window).load(function() {
    $('#grid').masonry({
      itemSelector: '.item',
      gutter: 10,
      columnWidth: 250
    });
  });

});

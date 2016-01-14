jQuery(function($) {

  $(window).load(function() {
    var index = 9; 
    var $grid = $('#grid').masonry({
      itemSelector: '.item',
      gutter: 10,
      columnWidth: 250
    });

    $(window).scroll(function() {
      if(this.timeoutId)
        window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(function() {

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          $.get('/remwell/load/'+index,{}, function(data) {
            $.each(data,function(index,post){
              console.log(post.title);
              var added = document.createElement('a');
              added.href = 'dope';
              var art = document.createElement('article');
              art.className='item';
              console.log(art);
              var header = document.createElement('h1');
              header.innerHTML = post.title;
              art.appendChild(header);
              added.appendChild(art);
              document.getElementById('grid').appendChild(added);
              $grid.masonry('appended',added);
            });
          });
        }

      }, 200);
    });


  });

});

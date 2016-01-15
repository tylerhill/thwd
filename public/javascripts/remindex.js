jQuery(function($) {

  $(window).load(function() {
    var index = 10;
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
          if(index >= 0 ) {
            $.get('/remwell/load/'+index,{}, function(data) {
              $.each(data,function(i,post){
                console.log(post.title);
                var added = document.createElement('a');
                added.href = '/remwell/post/'+post.id;
                var art = document.createElement('article');
                art.className='item';
                var header = document.createElement('h1');
                header.innerHTML = post.title;
                var img = document.createElement('img');
                img.src = '/post'+post.id+'/header.jpg';
                var capt = document.createElement('p');
                capt.innerHTML = post.capt;
                art.appendChild(header);
                art.appendChild(img);
                art.appendChild(capt);
                added.appendChild(art);
                document.getElementById('grid').appendChild(added);
                $grid.masonry('appended',added);
                index++;
              });
            });
          }
        }

      }, 200);
    });


  });

});

$(function(){
  $('input').on('click', function(){
    $(this).parent().toggleClass('checked');
  });
});

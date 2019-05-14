  
    const upvote = function (ids) {
    $.ajax({
      method:"GET",
      url:"/api/upvote/" + ids,
      success: function (data) {
        console.log(data);
      }
    });
  
  };
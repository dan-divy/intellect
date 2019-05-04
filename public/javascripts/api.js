var Intellect = function() {
  console.log("API");
}

Intellect.init = function () {
  console.log('Retrieving Latest Questions');
  $.ajax({
    method:"GET",
    url:"/api/latest",
    success: function (data) {
      console.log(data);
      for(var i=0;i<data.length;i++) {
        var markup = `<li class="list-group-item">
            <a href="/question/${data[i]._id}">
                ${data[i].question}
                <span class="float-right">${data[i].answers.length} Answer</span>
            <br>
            <span class="text-muted">
              ${data[i].subject}
            </span>
            </a>
          </li>`;
        $("#latest").append(markup);
      }
    }
  });

};

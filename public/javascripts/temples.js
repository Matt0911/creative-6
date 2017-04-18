$(document).ready(function(){
  $("#name").hidden();
  $("#quickstart-sign-in-status").hidden();

  var ids = [
    'bountiful',
    'brighamCity',
    'draper',
    'jordanRiver',
    'logan',
    'manti',
    'monticello',
    'mountTimpanogos',
    'ogden',
    'oquirrhMountain',
    'payson',
    'provoCityCenter',
    'provo',
    'stGeorge',
    'saltLake',
    'vernal'
  ]

  $("#save").click(function(){
    if ($("#name").text() != '') {
      var myobj = {Name:$("#name").text(),Temples:{}};
      for (var i = 0, len = ids.length; i < len; i++) {
        myobj.Temples[ids[i]] = $('#'+ids[i]).prop('checked');
      }
      console.log(myobj);
      jobj = JSON.stringify(myobj);
      // $("#json").text(jobj);

      var url = "temples";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
      });
    }
  });

  $("#load").click(function() {
    if ($("#name").text() != '') {
      $.getJSON('temples/' + $("#name").text(), function(data) {
        console.log(data);
        if (data === null) {
          for (var i = 0, len = ids.length; i < len; i++) {
            $('#'+ids[i]).prop('checked', false);
          }
        }
        else {
          for (temple in data.Temples) {
            if (data.Temples[temple]) {
              $('#'+ temple).prop('checked', true);
            }
            else {
              $('#'+ temple).prop('checked', false);
            }
          }
        }
        checkSelected();
      });
    }
  });

});

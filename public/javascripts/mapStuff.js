function checkSelected() {
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
  for (var i = 0, len = ids.length; i < len; i++) {
    if ($('#'+ids[i]).prop('checked')) {
      $('#'+ids[i]+'-map').show()
    } else {
      $('#'+ids[i]+'-map').hide()
    }
  }
}

$(document).ready(function() {
  checkSelected()
  $('input').click(checkSelected)
})

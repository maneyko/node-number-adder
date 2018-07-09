function sumInputs() {
  var sum = 0;
  $('input.number').each((index, value) => {
    var i = parseInt(value.value);
    if (! isNaN(i))
      sum += i;
  });
  $('#output')[0].innerHTML = `Sum: ${sum}`;
}

if (window.location.pathname === '/')
  sumInputs();

$('input.number').change(() => {
  sumInputs();
});

$($('#clear')[0]).click(() => {
  $('input.number').each((index, value) => {
    value.value = "";
  });
  sumInputs();
});

$($('#add')[0]).click(() => {
  var body = {
    number: "",
    value: "",
    description: ""
  };
  $('input.add').each((index, value) => {
    var value = value.value;
    if (index === 0)
      body['number'] = value;
    else if (index === 1)
      body['value'] = value;
    else if (index === 2)
      body['description'] = value;
  });
  for (key in body) {
    if (String(body[key]).length === 0)
      return;
  }
  body['value'] = parseInt(body['value']);
  if (isNaN(body['value']))
    return;
  console.log(body);
  $.ajax({
    type: 'POST',
    url: '/numbers',
    contentType: 'application/json',
    data: JSON.stringify(body),
    dataType: 'json',
    statusCode :{
      200: (response) => {
        location.reload();
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
});

$('.delete').click(function() {
  var id = $(this).parent().parent().attr('id');
  var id = id.replace('id-', '');
  console.log(id);
  if (id.length != 0)
    $.ajax({
      url: `/numbers/${id}`,
      type: 'DELETE',
      statusCode: {
        200: (response) => {
          location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
});

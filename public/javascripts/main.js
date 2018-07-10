function sumInputs() {
  let sum = 0;
  $('input.number').each((index, value) => {
    let i = parseInt(value.value);
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
  let body = {
    number: "",
    value: "",
    description: ""
  };
  $('input.add').each((index, value) => {
    let val = value.value;
    if (index === 0)
      body['number'] = val;
    else if (index === 1)
      body['value'] = val;
    else if (index === 2)
      body['description'] = val;
  });
  for (key in body) {
    if (String(body[key]).length === 0)
      return;
  }
  body['value'] = parseInt(body['value']);
  if (isNaN(body['value']))
    return;
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
  let id = $(this).parent().parent().attr('id');
  id = id.replace('id-', '');
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

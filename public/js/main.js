function sumInputs() {
  var sum = 0;
  $('input').each((index, value) => {
    var i = parseInt(value.value);
    if (! isNaN(i))
      sum += i;
  });
  $('#output')[0].innerHTML = `Sum: ${sum}`;
}

sumInputs();

$('input').change(() => {
  sumInputs();
});

$($('#clear')[0]).click(() => {
  $('input').each((index, value) => {
    value.value = "";
  });
  sumInputs();
});

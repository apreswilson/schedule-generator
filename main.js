let listOfEmployees = [

];


$('.criteria').submit(function (event) {
  event.preventDefault();


  const employeeName = $('#fullname').val();
  const earliestAvailable = $('#in').val();
  const latestAvailable = $('#out').val();
  const daysAvailable = [];

  $('.day-checkbox').each(function () {
    if ($(this).is(':checked')) {
      daysAvailable.push($(this).next().text());
    }
  });

  const formData = {
    employeeName: employeeName,
    earliestAvailable: earliestAvailable,
    latestAvailable: latestAvailable,
    daysAvailable: daysAvailable
  };

  listOfEmployees.push(formData);

  $(".criteria").get(0).reset();
});

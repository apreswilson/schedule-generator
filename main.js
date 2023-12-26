let listOfEmployees = [

];


$('.criteria').submit(function (event) {
  event.preventDefault();


  const employeeName = $('#fullname').val();
  const earliestAvailable = Number($('#in').val());
  const latestAvailable = Number($('#out').val());
  let daysAvailable = [];

  $('.day-checkbox').each(function () {
    if ($(this).is(':checked')) {
      daysAvailable.push($(this).next().text());
    }
  });
  
  //Error handling
  if (earliestAvailable > latestAvailable) {
    alert("Earliest time must be before latest time")
    return;
  }

  if (daysAvailable.length === 0) {
    alert("None Checked");
    return;
  }

  const formData = {
    employeeName: employeeName,
    earliestAvailable: earliestAvailable,
    latestAvailable: latestAvailable,
    daysAvailable: daysAvailable
  };

  listOfEmployees.push(formData);
  console.log(listOfEmployees);

  $(".criteria").get(0).reset();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let generatedSchedule = {
    "Monday": {}, 
    "Tuesday": {},
    "Wednesday": {},
    "Thursday": {},
    "Friday": {},
    "Saturday": {},
    "Sunday": {},
  };

  for (let i = 0; i < daysOfWeek.length; i++) {
    if (daysAvailable.indexOf(daysOfWeek[i]) !== -1) {
      let upperBound = Math.floor(Math.random() * (latestAvailable - earliestAvailable + 1) + earliestAvailable);
      let lowerBound = Math.floor(Math.random() * (upperBound - earliestAvailable + 1) + earliestAvailable);

      if (upperBound >= 12) {
        upperBound = String(upperBound - 11) + " PM";
      } else {
        upperBound = String(upperBound) + " AM";
      }

      if (lowerBound >= 12)  {
        lowerBound = String(lowerBound - 11) + " PM";
      } else {
        lowerBound = String(lowerBound) + " AM";
      }

      generatedSchedule[daysOfWeek[i]] = [lowerBound, upperBound];
    } else {
      generatedSchedule[daysOfWeek[i]] = [" ", " "];
    }

  }
  console.log(generatedSchedule);

  $("tbody tr:last")
    .after(
    `<tr>
      <td>${employeeName}</td>
      <td>${generatedSchedule.Monday[0] + " - " + generatedSchedule.Monday[1]}</td>
      <td>${generatedSchedule.Tuesday[0] + " - " + generatedSchedule.Tuesday[1]}</td>
      <td>${generatedSchedule.Wednesday[0] + " - " + generatedSchedule.Wednesday[1]}</td>
      <td>${generatedSchedule.Thursday[0] + " - " + generatedSchedule.Thursday[1]}</td>
      <td>${generatedSchedule.Friday[0] + " - " + generatedSchedule.Friday[1]}</td>
      <td>${generatedSchedule.Saturday[0] + " - " + generatedSchedule.Saturday[1]}</td>
      <td>${generatedSchedule.Sunday[0] + " - " + generatedSchedule.Sunday[1]}</td>
    </tr>`);
});

/*
Final creation:
let schedule = {
  "Monday": {
    "Schedule": ["10 AM", "2 PM"]
  },
  "Tuesday": {
    "Schedule": [" ", " "]
  }
}
*/
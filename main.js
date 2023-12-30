let listOfEmployees = [

];


$('.criteria').submit(function (event) {
  event.preventDefault();


  const employeeName = $('#fullname').val();
  const earliestAvailable = Number($('#in').val());
  const latestAvailable = Number($('#out').val());

  console.log(typeof earliestAvailable, typeof latestAvailable)
  let daysAvailable = [];

  $('.day-checkbox').each(function () {
    if ($(this).is(':checked')) {
      daysAvailable.push($(this).next().text());
    }
  });
  
  //Error handling
  if (earliestAvailable > latestAvailable) {
    alert("Earliest time must be before latest time");
    return;
  }

  if ((latestAvailable - earliestAvailable) < 3) {
    alert("Minimum of three hour shifts required on days available");
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

  //TODO: FIX THE CONDITIONALS AND NUMBER GENERATION PROBABLY
  for (let i = 0; i < daysOfWeek.length; i++) {
    if (daysAvailable.indexOf(daysOfWeek[i]) !== -1) {
      let clockOutTime = Math.floor(Math.random() * (formData.latestAvailable - formData.earliestAvailable + 1) + formData.earliestAvailable);
      let clockInTime =  Math.floor(Math.random() * (clockOutTime - formData.earliestAvailable + 1) + formData.earliestAvailable);

      //Minimum 3 hour shifts
      if (clockOutTime - clockInTime === 0) {
        clockOutTime +=3;
      } else if (clockOutTime - clockInTime === 1) {
        clockOutTime += 2;
      } else if (clockOutTime - clockInTime === 2) {
        clockOutTime ++;
      }

      //Convert time to string
      if (clockOutTime > 12) {
        clockOutTime = String(clockOutTime - 12) + " PM";
      } else if (clockOutTime === 12) {
        clockOutTime = String(clockOutTime) + " PM";
      } else {
        clockOutTime = String(clockOutTime) + " AM";
      }

      if (clockInTime > 12) {
        clockInTime = String(clockInTime - 12) + " PM";
      } else if (clockInTime === 12) {
        clockOutTime = String(clockInTime) + " PM";
      } else {
        clockInTime = String(clockInTime) + " AM";
      }

      generatedSchedule[daysOfWeek[i]] = [clockInTime, clockOutTime];
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
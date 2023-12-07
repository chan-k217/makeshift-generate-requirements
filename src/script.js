document
  .getElementById("daysFromStartDate")
  .addEventListener("input", function () {
    document.getElementById("sliderValue").textContent = this.value;
  });

document.getElementById("sendButton").addEventListener("click", function () {
  var numberRNsValue = document.getElementById("minimum-RNs").value; // slider
  var numberChargesValue = document.getElementById(
    "minimum-charge-nurse"
  ).value;
  var numberSupervisorsValue = document.getElementById(
    "minimum-supervisors"
  ).value;
  var numberDaysFromStartDateValue =
    document.getElementById("daysFromStartDate").value;
  // date field value
  var startDateValue = document.getElementById("startdate").value;
  /*
  var dropdownValue = document.getElementById("optionsDropdown").value; //dropdown
  var radiobuttonValue = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  // date field value
  var startDateValue = document.getElementById("startdate").value;

  // for checkbox
  var checked = [];
  var checkboxes = document.querySelectorAll(
    'input[name="vehicle-check"]:checked'
  );
  checkboxes.forEach(function (checkbox) {
    checked.push(checkbox.value);
  });
  var checkedListString = checked.join(", "); //combined all checked items values using , separated

  // numeric value for quantity
  var quantityValue = document.getElementById("quantity").value;

  // password
  var passwordText = document.getElementById("password").value;

  console.log(`slider: ${sliderValue} \n 
              dropdown: ${dropdownValue} \n
              radiobutton: ${radiobuttonValue} \n
              checkboxes: ${checkedListString} \n
              date: ${dateValue} \n
              number: ${quantityValue} \n
              password: ${passwordText}`);
  */
  // Prepare the data to be sent
  var data = {
    pipeline: {
      pipeline_id: "a_2YdO6Q9aFn0nM9qUJDFUqe59kBX",
      project_id: "2XLKAGnutqzdA2KP2rDB8FpRl8L",
    },
    variables: {
      number_of_RNs_each_shift: {
        facet_name: "1-3. Create shiftsuser pos requirement",
        is_list: false,
        name: "number_of_RNs_each_shift",
        type: "NUMBER",
        value: numberRNsValue,
      },
      number_of_charges_each_shift: {
        facet_name: "1-3. Create shiftsuser pos requirement",
        is_list: false,
        name: "number_of_charges_each_shift",
        type: "NUMBER",
        value: numberChargesValue,
      },
      number_of_days_to_schedule: {
        facet_name: "1-3. Create shiftsuser pos requirement",
        is_list: false,
        name: "number_of_days_to_schedule",
        type: "NUMBER",
        value: numberDaysFromStartDateValue,
      },
      number_of_supervisors_each_shift: {
        facet_name: "1-3. Create shiftsuser pos requirement",
        is_list: false,
        name: "number_of_supervisors_each_shift",
        type: "NUMBER",
        value: numberSupervisorsValue,
      },
      start_date: {
        facet_name: "1-3. Create shiftsuser pos requirement",
        is_list: false,
        name: "start_date",
        type: "TEXT",
        value: startDateValue,
      },
    },
  };

  // Example of sending data to an API with authentication headers
  fetch("https://api.ikigailabs.io/pypr/run-pipeline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add your authentication headers here
      User: "demo@ikigailabs.io",
      "Api-key": "2S2bcHagJLgme4jI5FWdpN028PE",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  setInterval(updateStatus, 3000); //check pipeline running status every 3 seconds
});

function updateStatus() {
  // Here you can call your API to check the status
  // For demo purposes, let's assume a function checkApiStatus() that returns a promise

  checkApiStatus()
    .then((isActive) => {
      document.getElementById("statusBubble").style.backgroundColor = isActive
        ? "green"
        : "gray";
    })
    .catch(() => {
      document.getElementById("statusBubble").style.backgroundColor = "gray";
    });
}

async function checkApiStatus() {
  // Replace this with the actual API call
  return fetch(
    "https://api.ikigailabs.io/pypr/is-pipeline-running?pipeline_id=2YdCHHuTLss1ayreX6LqH8GKUFy",
    {
      method: "GET",
      headers: {
        User: "demo@ikigailabs.io",
        "Api-key": "2S2bcHagJLgme4jI5FWdpN028PE",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.status)
    .catch((error) => {
      console.error("Error checking API status:", error);
      throw error;
    });

  // Assuming the API returns { isActive: true/false }
}

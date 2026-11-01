// ---------- 1. Calculation functions ----------

// Tip amount = bill x tip% / 100
function calculateTip(bill, tipPercent) {
  return (bill * tipPercent) / 100;
}

// Total = bill + tip
function calculateTotal(bill, tip) {
  return bill + tip;
}

// Amount per person = total / people
function calculatePerPerson(total, people) {
  return total / people;
}

// ---------- 2. Suggestion message (if-else) ----------

function getSuggestion(tipPercent) {
  if (tipPercent < 5) {
    return "Low";
  } else if (tipPercent <= 15) {
    return "Normal";
  } else {
    return "Generous";
  }
}

// ---------- 3. Validation ----------

// Shows an error message under a field
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// Returns true only if all inputs are valid
function validateInputs(billText, tipText, peopleText) {
  var isValid = true;

  // clear old errors first
  showError("billError", "");
  showError("tipError", "");
  showError("peopleError", "");

  // Bill: required, must be greater than 0
  if (billText === "") {
    showError("billError", "Please enter the bill amount.");
    isValid = false;
  } else if (isNaN(billText) || Number(billText) <= 0) {
    showError("billError", "Bill must be a number greater than 0.");
    isValid = false;
  }

  // Tip: required, between 0 and 100
  if (tipText === "") {
    showError("tipError", "Please enter the tip percentage.");
    isValid = false;
  } else if (isNaN(tipText) || Number(tipText) < 0 || Number(tipText) > 100) {
    showError("tipError", "Tip must be a number between 0 and 100.");
    isValid = false;
  }

  // People: required, whole number, at least 1
  if (peopleText === "") {
    showError("peopleError", "Please enter the number of people.");
    isValid = false;
  } else if (isNaN(peopleText) || Number(peopleText) < 1 || !Number.isInteger(Number(peopleText))) {
    showError("peopleError", "People must be a whole number, 1 or more.");
    isValid = false;
  }

  return isValid;
}

// ---------- 4. Main function (runs when button is clicked) ----------

function splitBill() {
  var billText = document.getElementById("bill").value.trim();
  var tipText = document.getElementById("tip").value.trim();
  var peopleText = document.getElementById("people").value.trim();
  var result = document.getElementById("result");

  // stop if any input is wrong
  if (!validateInputs(billText, tipText, peopleText)) {
    result.innerHTML = "";
    return;
  }

  // convert text to numbers
  var bill = Number(billText);
  var tipPercent = Number(tipText);
  var people = Number(peopleText);

  // use our functions
  var tip = calculateTip(bill, tipPercent);
  var total = calculateTotal(bill, tip);
  var perPerson = calculatePerPerson(total, people);

  // checkbox: round up if ticked
  if (document.getElementById("roundUp").checked) {
    perPerson = Math.ceil(perPerson);
  }

  var message = getSuggestion(tipPercent);

  // show the output
  result.innerHTML =
    "Tip amount: " + tip.toFixed(2) + "<br>" +
    "Total bill: " + total.toFixed(2) + "<br>" +
    "Per person: " + perPerson.toFixed(2) + "<br>" +
    "<span id='suggestion'>Tip suggestion: " + message + "</span>";
}
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
    });

    currentStep = index;

    // Update the step-indicator display
    const indicator = document.getElementById("stepIndicator");
    indicator.innerHTML = `
    Step ${index + 1} of 3
    <div class="dots">
      <div class="dot ${index === 0 ? "active" : ""}"></div>
      <div class="dot ${index === 1 ? "active" : ""}"></div>
      <div class="dot ${index === 2 ? "active" : ""}"></div>
    </div>
  `;
  }

  function nextStep() {
    if(currentStep === 0) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if(!name || !email) {
            alert("Please fill in both name and email.");
            return;
        }

    }

    if(currentStep === 1) {
        const checkboxes = document.querySelectorAll('input[name="topics"]');
        const oneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

          if (!oneChecked) {
            alert("Please select at least one topic.");
            return; // stop moving to next step
          }

          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const selectedTopics = Array.from(document.querySelectorAll('input[name="topics"]:checked'))
            .map(cb => `<li>${cb.value}</li>`)
            .join("");


          document.getElementById("summaryName").textContent = name;
          document.getElementById("summaryEmail").textContent = email;
          document.getElementById("summaryTopics").innerHTML = selectedTopics;

    }

    if(currentStep < steps.length - 1) {
    showStep(currentStep + 1);
    }

    if (currentStep === steps.length - 1) {

      //Hide step indicator
      const stepIndicator = document.getElementById("stepIndicator");
      stepIndicator.style.display = "none";

      const form = document.querySelector(".form-container");
      form.style.display = "none";

      return; // stop further execution
    }
  }

 window.nextStep = nextStep;
 window.showStep = showStep;

 showStep(currentStep);
});
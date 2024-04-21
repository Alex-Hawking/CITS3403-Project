// ----------   USER PROFILE ----------

$(document).ready(function () {
  $("#editButton").click(function () {
    $("#editFormDiv").toggle();
  });

  $("#changePasswordButton").click(function () {
    $("#passwordFormDiv").toggle();
  });
});

// Sign-up Form validation

$(document).ready(function () {
  $("#signUpForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission
    const formData = $(this).serialize(); // Serialize the form data

    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: formData,
      dataType: "json",
      success: function (response) {
        const redirectUrl = $("#signUpForm").data("redirect-url");
        window.location.href = redirectUrl; // Redirect to home page
      },
      error: function (xhr, status, error) {
        $(".error-message").remove(); // Clear previous error messages

        if (xhr.status === 500) {
          // Database update failure
          console.error("Server Error: " + xhr.responseText);
          alert(
            "We're experiencing technical difficulties. Please try again later.",
          );
        } else if (xhr.status === 400) {
          const response = JSON.parse(xhr.responseText);
          if (response.status === "error") {
            for (let fieldName in response.message) {
              let message = response.message[fieldName];
              let $inputField = $("#" + fieldName);
              $inputField.after(
                '<div class="error-message" style="color:red;">' +
                  message +
                  "</div>",
              );
            }
          }
        } else {
          console.log("Error: " + xhr.status + " - " + error);
        }
      },
    });
  });
});

// Log in validation

$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          const redirectUrl = $("#signUpForm").data("redirect-url");
          window.location.href = redirectUrl; // Redirect to home page
        }
      },
      error: function (xhr, status, error) {
        if (xhr.status === 401) {
          $("#loginError").text(xhr.responseJSON.message).show(); // Display error message from the server
        } else {
          console.error("Error: " + xhr.status + " - " + xhr.statusText);
          $("#loginError")
            .text("An unexpected error occurred. Please try again.")
            .show();
        }
      },
    });
  });
});

// Update user information validation

$(document).ready(function () {
  $("#editForm").submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          location.reload(); // Reload the page to reflect changes
        }
      },
      error: function (xhr, status, error) {
        $(".error-message").remove();
        if (xhr.status === 500) {
          console.error("Server Error: " + xhr.responseText);
          alert(
            "We're experiencing technical difficulties. Please try again later.",
          );
        } else if (xhr.status === 400) {
          const response = JSON.parse(xhr.responseText);
          // console.log(response) Debug
          if (response.status === "error") {
            $("#missingSocialError").hide();
            for (let fieldName in response.message) {
              if (fieldName == "missingSocialError") {
                $("#missingSocialError")
                  .text("At least one social handle is required")
                  .show();
              }
              let message = response.message[fieldName];
              let $inputField = $("#" + "edit_" + fieldName);
              $inputField.after(
                '<div class="error-message" style="color:red;">' +
                  message +
                  "</div>",
              );
            }
          }
        } else {
          console.log("Error: " + xhr.status + " - " + error);
        }
      },
    });
  });
});

// Changing password validation

$(document).ready(function () {
  $("#passwordForm").submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          location.reload();
        }
      },
      error: function (xhr) {
        $(".error-message").remove();
        if (xhr.status === 500) {
          console.error("Server Error: " + xhr.responseText);
          $("#passwordError")
            .text(
              "We're experiencing technical difficulties. Please try again later.",
            )
            .show();
        } else if (xhr.status === 400) {
          const response = JSON.parse(xhr.responseText);
          $("#passwordError").text(xhr.responseJSON.message).show();
        } else {
          console.error("Error: " + xhr.status + " - " + xhr.statusText);
        }
      },
    });
  });
});

function loadUserProfile(userId) {
  fetch(`/profile/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous data
      document.getElementById("user-name").textContent =
        `${data.first_name} ${data.last_name}`;
      document.getElementById("user-email").textContent = data.email;
      document.getElementById("user-phone").textContent =
        data.phone_number || "N/A";

      // Checking if the social media information exists
      document.getElementById("user-instagram").textContent =
        data.socials.instagram || "N/A";
      document.getElementById("user-facebook").textContent =
        data.socials.facebook || "N/A";
      document.getElementById("user-snapchat").textContent =
        data.socials.snapchat || "N/A";
      document.getElementById("user-twitter").textContent =
        data.socials.twitter || "N/A";
    })
    .catch((error) => {
      console.error("Error loading the user profile:", error);
      const modalBody = document.querySelector("#profileModal .modal-body");
      modalBody.innerHTML = `<p>Error loading profile. Please try again.</p>`; // Handle loading errors
    });
}

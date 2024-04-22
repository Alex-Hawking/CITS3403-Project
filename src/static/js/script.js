// ----------   USER PROFILE ----------

$(document).ready(function () {
  $("#editButton").click(function () {
    $("#editForm").toggle();
  });

  $("#changePasswordButton").click(function () {
    $("#passwordForm").toggle();
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

function setPostId(postId) {
  $("#post-id").val(postId); // Set the value of the input
}

function toggleReplies(postId) {
  $("#replies-" + postId).toggle(); // Toggle the display state of the replies
}

// OLD CODE THAT WILL REFRESH THE PAGE

// $(document).ready(function() {
//     $('#replyForm').submit(function(event) {
//         event.preventDefault(); // Prevent the default form submission behavior

//         var formData = new FormData(this); // 'this' refers to the form itself
//         var postUrl = $('#submitReplyUrl').val(); // Get the URL from the hidden input

//         $.ajax({
//             type: 'POST',
//             url: postUrl,
//             data: formData,
//             processData: false, // Prevent jQuery from converting the data into a query string
//             contentType: false, // Must be false to tell jQuery not to add a Content-Type header
//             success: function(data) {
//                 if (data.error) {
//                     alert(data.error);
//                 } else {
//                     console.log(data.message);
//                     $('#replyModal').modal('hide'); // Hide the modal using jQuery
//                     location.reload(); // Refresh the page to show the new reply
//                 }
//             },
//             error: function(xhr, status, error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// });

// Dynamically show the reply without refresching the page

$(document).ready(function () {
  $("#replyForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(this);
    var postUrl = $("#submitReplyUrl").val(); // Get the URL from the hidden input

    $.ajax({
      type: "POST",
      url: postUrl,
      data: formData,
      processData: false, // Prevent jQuery from converting the data into a query string
      contentType: false, // Must be false to tell jQuery not to add a Content-Type header
      success: function (data) {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data.message);
          $("#replyModal").modal("hide"); // Hide the modal using jQuery
          $('#replyForm textarea[name="content"]').val(""); // Clear the reply box

          // Dynamically add reply and immediatley show the current replies
          let replyHtml =
            '<div class="card mt-2"><div class="card-body">' +
            '<h6 class="card-subtitle mb-2 text-muted">Reply by You</h6>' +
            '<p class="card-text">' +
            data.content +
            "</p></div></div>";
          $("#replies-" + data.post_id)
            .prepend(replyHtml)
            .show();
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
});

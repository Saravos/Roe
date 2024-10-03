let startTime, endTime;

// Function to capture the start time when the form is loaded
window.onload = function() {
    const firstInput = document.getElementById("userFirstName");
    firstInput.addEventListener('focus', startTimer);

    const form = document.getElementById("form");
    form.addEventListener('submit', saveFormData);

    // Add listener for file input outside of form submission
    const fileInput1 = document.getElementById('file1');
    fileInput1.addEventListener('change', handleFileUpload1);

    const fileInput2 = document.getElementById('file2');
    fileInput2.addEventListener('change', handleFileUpload2);

    const companySelect = document.getElementById("companies");
    const otherCompanyDiv = document.getElementById("otherCompanyDiv");

    //Fumction for other values input field
companySelect.addEventListener("change", function() {
    if (companySelect.value === "Others") {
        otherCompanyDiv.style.display = "block"; // Show the other company input
    } else {
        otherCompanyDiv.style.display = "none"; // Hide the other company input
    }
});
};

// Start timer when the user focuses on the first input field
function startTimer() {
    startTime = new Date();
}


// Handle file upload separately
function handleFileUpload1() {
    let file = this.files[0];
    const fileInfo = document.getElementById('fileInfo1');
    if (file) {
        // Display file name and size below the file input
        fileInfo.textContent = `Selected File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
        // If no file is selected, clear the file info
        fileInfo.textContent = 'No file selected';
    }
}
function handleFileUpload2() {
    let file = this.files[0];
    const fileInfo= document.getElementById('fileInfo2');
    if (file) {
        // Display file name and size below the file input
        fileInfo.textContent = `Selected File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
        // If no file is selected, clear the file info
        fileInfo.textContent = 'No file selected';
    }
}

// Function to capture end time and save form data to a .txt file
function saveFormData(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Capture end time and calculate time taken
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    document.getElementById('timeTaken').value = timeTaken;

    // Collect form data
    const firstName = document.getElementById('userFirstName').value;
    const lastName = document.getElementById('userLastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const passport = document.getElementById('passport').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;


    let organization =document.getElementById('companies').value;
    if (organization === "Others") {
        const otherCompany = document.getElementById('otherCompany').value;
        if (otherCompany) {
            organization = otherCompany; // Override organization value with the specified company
        }
    }

    // Get uploaded files from both inputs
    const fileInput1 = document.getElementById('file1').files[0];
    const fileInput2 = document.getElementById('file2').files[0];
    let fileName1 = fileInput1 ? fileInput1.name : "No file uploaded";
    let fileName2 = fileInput2 ? fileInput2.name : "No file uploaded";

    // Create the content to be saved
    const formData = `First Name: ${firstName}\nLast Name: ${lastName}\nGender: ${gender}\nAddress: ${address}\nEmail: ${email}\nPhone: ${phone}\nNationality: ${nationality}\nPassport/EID Number: ${passport}\nOrganization: ${organization}\nFile1 Uploaded: ${fileName1}\nFile2 Uploaded: ${fileName2}\nTime Taken: ${timeTaken} seconds`;

    // Create a Blob and save it as a text file using FileSaver.js
    const blob = new Blob([formData], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "formData.txt");
}

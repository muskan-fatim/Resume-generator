// Function to create the resume
async function createResume() {
    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";
    // Getting values from input fields
    const name = document.getElementById("name").value;
    const father = document.getElementById("father").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const college = document.getElementById("college").value;
    const describe1 = document.getElementById("describe1").value;
    const college2 = document.getElementById("college2").value;
    const describe2 = document.getElementById("describe2").value;
    const fieldOfStudy = document.getElementById("field_of_study").value;
    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim()).join(", ");
    const experience = document.getElementById("experience").value;

    // Creating resume content dynamically
    const resumeContainer = document.getElementById("resume");
    resumeContainer.innerHTML = `
        <div class="container" id="resumeContent">
            <aside class="sidebar">
                <div class="profile-info">
                    <h2>${name}</h2>
                    <p><strong>Father's Name:</strong> ${father}</p>
                    <section class="profile-details">
                        <h3>Profile</h3>
                        <p>${fieldOfStudy}</p>
                    </section>
                    <section class="contact-info">
                        <h3>Contact Me</h3>
                        <p><strong>📞</strong> ${contact}</p>
                        <p><strong>📧</strong> ${email}</p>
                        <p><strong>📍</strong> ${address}</p>
                    </section>
                </div>
            </aside>
            <main class="main-content">
                <section>
                    <h3>Education</h3>
                    <p><strong>${college}:</strong><br> ${describe1}</p>
                    <p><strong>${college2}:</strong><br> ${describe2}</p>
                </section>
                <section>
                    <h3>Skills</h3>
                    <p>${skills}</p>
                </section>
                <section>
                    <h3>Experience</h3>
                    <p>${experience}</p>
                </section>
                <button onclick="editResume()">Edit</button>
                <button onclick="downloadResume()">Download</button>
                <button onclick="shareResume()">Share</button>
            </main>
        </div>`;
}

// Function to edit the resume (reset the form view)
function editResume() {
    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "block";
    document.getElementById("resume").innerHTML = "";
}

// Function to download the resume as PDF
async function downloadResume() {
    try {
        const resumeContent = document.getElementById("resumeContent");
        if (resumeContent) {
            const canvas = await html2canvas(resumeContent, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("resume.pdf");
        }
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}

// Function to share the resume via a URL or clipboard
async function shareResume() {
    try {
        const resumeContent = document.getElementById("resumeContent");
        if (resumeContent) {
            const canvas = await html2canvas(resumeContent, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);
            if (navigator.share) {
                await navigator.share({
                    title: "My Resume",
                    text: "Check out my resume!",
                    url: pdfUrl,
                });
            } else {
                await navigator.clipboard.writeText(pdfUrl);
                alert("Link copied to clipboard! You can now share it.");
            }
        }
    } catch (error) {
        console.error("Error sharing resume:", error);
    }
}

// Expose functions to global window object for browser usage
window.createResume = createResume;
window.editResume = editResume;
window.downloadResume = downloadResume;
window.shareResume = shareResume;

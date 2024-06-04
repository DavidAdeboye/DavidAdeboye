function generateResume() {
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const education = document.getElementById('education').value;
    const certificates = document.getElementById('certificates').value;
    const photoInput = document.getElementById('photo');
    
    if (!fullName || !dob || !email || !description || !experience || !skills || !education) {
        alert("Please fill in all required fields.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const photo = e.target.result;

        const resumeOutput = `
            <h2 class="text-center mb-4">${fullName}</h2>
            <div class="text-center mb-4">
                <img src="${photo}" alt="Photo" class="rounded mb-3" style="width: 150px;">
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Date of Birth:</strong> ${dob}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Description:</strong></p>
                    <p>${description}</p>
                    <p><strong>Experience:</strong></p>
                    <p>${experience}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Skills:</strong></p>
                    <p>${skills}</p>
                    <p><strong>Education:</strong></p>
                    <p>${education}</p>
                    <p><strong>Certificates:</strong></p>
                    <p>${certificates}</p>
                </div>
            </div>
        `;

        document.getElementById('resumeOutput').innerHTML = resumeOutput;
        document.getElementById('resumeOutput').classList.remove('hidden');
    };

    if (photoInput.files[0]) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        const resumeOutput = `
            <h2 class="text-center mb-4">${fullName}</h2>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Date of Birth:</strong> ${dob}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Description:</strong></p>
                    <p>${description}</p>
                    <p><strong>Experience:</strong></p>
                    <p>${experience}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Skills:</strong></p>
                    <p>${skills}</p>
                    <p><strong>Education:</strong></p>
                    <p>${education}</p>
                    <p><strong>Certificates:</strong></p>
                    <p>${certificates}</p>
                </div>
            </div>
        `;

        document.getElementById('resumeOutput').innerHTML = resumeOutput;
        document.getElementById('resumeOutput').classList.remove('hidden');
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const education = document.getElementById('education').value;
    const certificates = document.getElementById('certificates').value;

    let photoData = '';
    const photoInput = document.getElementById('photo');
    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoData = e.target.result;
            addContentToPDF(doc, fullName, dob, email, description, experience, skills, education, certificates, photoData);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        addContentToPDF(doc, fullName, dob, email, description, experience, skills, education, certificates, photoData);
    }
}

function addContentToPDF(doc, fullName, dob, email, description, experience, skills, education, certificates, photoData) {
    doc.setFontSize(22);
    doc.text(fullName, 20, 20);

    if (photoData) {
        doc.addImage(photoData, 'JPEG', 150, 10, 50, 50);
    }

    doc.setFontSize(16);
    doc.text('Born on ' + dob, 20, 60);
    doc.text( + email, 20, 70);

    doc.setFontSize(14);
    doc.text(description, 20, 90);

    doc.text('Experience:', 20, 110);
    doc.text(experience, 20, 120);

    doc.text('Skills:', 20, 140);
    doc.text(skills, 20, 150);

    doc.text('Education:', 20, 170);
    doc.text(education, 20, 180);

    doc.text('Certificates:', 20, 200);
    doc.text(certificates, 20, 210);

    doc.save(fullName+' resume.pdf');
}

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function showDoctors() {
    document.getElementById("doctors").style.display = "block";
    document.getElementById("doctors").scrollIntoView({
        behavior: "smooth"
    });
}

function bookAppointment() {
    document.getElementById("appointmentForm").style.display = "block";
    document.getElementById("appointmentForm").scrollIntoView({
        behavior: "smooth"
    });
}

function bookDoctor(doctorName) {
    document.getElementById("appointmentForm").style.display = "block";
    document.getElementById("doctorSelect").value = doctorName;

    document.getElementById("appointmentForm").scrollIntoView({
        behavior: "smooth"
    });
}

function submitAppointment() {
    let name = document.getElementById("patientName").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;
    let doctor = document.getElementById("doctorSelect").value;

    if (name === "" || phone === "" || date === "" || time === "" || doctor === "") {
        alert("Please fill in all the details.");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
    alert("📞 Please enter a valid 10-digit phone number.");
    return;
}

let today = new Date().toISOString().split("T")[0];

if (date < today) {
    alert("📅 Please select today or a future date.");
    return;
}
    let alreadyBooked = appointments.some(function(appointment) {
    return appointment.date === date &&
           appointment.time === time &&
           appointment.doctor === doctor;
});

if (alreadyBooked) {
    alert("❌ This doctor is already booked at this time. Please choose another time.");
    return;
}

    let appointment = {
        name: name,
        phone: phone,
        date: date,
        time: time,
        doctor: doctor,
        status: "Confirmed"
    };

    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("confirmationDetails").innerHTML =
        "Patient: " + name +
        "<br>Doctor: " + doctor +
        "<br>Date: " + date +
        "<br>Time: " + time +
        "<br>Phone: " + phone;

    document.getElementById("confirmation").style.display = "block";
    document.getElementById("appointmentForm").style.display = "none";
}

function showDashboard() {
    document.getElementById("dashboard").style.display = "block";
    let today = new Date().toISOString().split("T")[0];

document.getElementById("totalAppointments").textContent =
    appointments.length;

document.getElementById("confirmedAppointments").textContent =
    appointments.filter(function(appointment) {
        return appointment.status === "Confirmed";
    }).length;

document.getElementById("todayAppointments").textContent =
    appointments.filter(function(appointment) {
        return appointment.date === today;
    }).length;

    let list = document.getElementById("appointmentList");

    if (appointments.length === 0) {
        list.innerHTML = "<p>No appointments yet.</p>";
        return;
    }

    list.innerHTML = "";

    appointments.forEach(function(appointment) {
        list.innerHTML += `
            <div class="appointment">
                <h3>📅 Appointment</h3>
                <p>👤 Patient: ${appointment.name}</p>
                <p>👨‍⚕️ Doctor: ${appointment.doctor}</p>
                <p>📅 Date: ${appointment.date}</p>
                <p>⏰ Time: ${appointment.time}</p>
                <p>📞 Phone: ${appointment.phone}</p>
                <p>🟢 Status: ${appointment.status}</p>
                <button onclick="cancelAppointment(${appointments.indexOf(appointment)})">
    ❌ Cancel Appointment
</button>
            </div>
        `;
    });
}
function cancelAppointment(index) {
    let confirmed = confirm("Are you sure you want to cancel this appointment?");

    if (!confirmed) {
        return;
    }

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("✅ Appointment cancelled successfully.");

    showDashboard();
}
function clearAppointments() {
    if (appointments.length === 0) {
        alert("There are no appointments to clear.");
        return;
    }

    let confirmed = confirm(
        "Are you sure you want to delete all appointments?"
    );

    if (!confirmed) {
        return;
    }

    appointments = [];

    localStorage.removeItem("appointments");

    alert("✅ All appointments have been cleared.");

    showDashboard();
      }

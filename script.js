const slotsContainer = document.getElementById('slots');
const dateInput = document.getElementById('appointment-date');
const form = document.getElementById('booking-form');
const message = document.getElementById('message');

const SLOT_TIMES = ['09:00', '10:30', '13:00', '14:30', '16:00'];
const STORAGE_KEY = 'bookings-v1';
let selectedSlot = null;

const today = new Date();
const isoToday = today.toISOString().split('T')[0];
dateInput.min = isoToday;
dateInput.value = isoToday;

function loadBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function saveBookings(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function renderSlots() {
  selectedSlot = null;
  slotsContainer.innerHTML = '';

  const bookings = loadBookings();
  const date = dateInput.value;
  const dayBookings = bookings[date] || [];

  SLOT_TIMES.forEach((time) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot-btn';
    btn.role = 'listitem';
    btn.textContent = time;

    if (dayBookings.includes(time)) {
      btn.disabled = true;
      btn.textContent = `${time} (belegt)`;
    }

    btn.addEventListener('click', () => {
      document.querySelectorAll('.slot-btn').forEach((slotBtn) => slotBtn.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSlot = time;
      showMessage(`Ausgewählt: ${date} um ${time}`, 'ok');
    });

    slotsContainer.appendChild(btn);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const date = dateInput.value;

  if (!name || !email) {
    showMessage('Bitte Name und E-Mail ausfüllen.', 'err');
    return;
  }

  if (!selectedSlot) {
    showMessage('Bitte zuerst ein Zeitfenster auswählen.', 'err');
    return;
  }

  const bookings = loadBookings();
  bookings[date] = bookings[date] || [];

  if (bookings[date].includes(selectedSlot)) {
    showMessage('Dieses Zeitfenster wurde gerade belegt. Bitte neu wählen.', 'err');
    renderSlots();
    return;
  }

  bookings[date].push(selectedSlot);
  saveBookings(bookings);

  showMessage(
    `Danke ${name}! Termin am ${date} um ${selectedSlot} wurde gespeichert. Bestätigung an ${email}.`,
    'ok'
  );

  form.reset();
  form.email.value = '';
  dateInput.value = date;
  renderSlots();
});

dateInput.addEventListener('change', renderSlots);
renderSlots();

'use strict';

// Sample employee records for this course exercise only. No server or real authentication.
// All passwords begin with a special character and contain uppercase and numeric characters.
const movingRepresentatives = [
  { firstName: 'Jordan', lastName: 'Parker', password: '!Move1', id: '1001', phone: '2015550101', extension: '123', email: 'jordan@mou.com' },
  { firstName: 'Taylor', lastName: 'Brooks', password: '@Truck2', id: '1002', phone: '2015550102', extension: '124', email: 'taylor@mou.com' },
  { firstName: 'Morgan', lastName: 'Reed', password: '#Shift3', id: '1003', phone: '2015550103', extension: '125', email: 'morgan@mou.com' },
  { firstName: 'Casey', lastName: 'Lee', password: '$Lift4', id: '1004', phone: '2015550104', extension: '126', email: 'casey@mou.com' },
  { firstName: 'Avery', lastName: 'Scott', password: '%Pack5', id: '1005', phone: '2015550105', extension: '127', email: 'avery@mou.com' },
  { firstName: 'Riley', lastName: 'Adams', password: '&Move6', id: '1006', phone: '2015550106', extension: '128', email: 'riley@mou.com' },
  { firstName: 'Jamie', lastName: 'Evans', password: '*Load7', id: '1007', phone: '2015550107', extension: '129', email: 'jamie@mou.com' },
  { firstName: 'Drew', lastName: 'Harris', password: '?Haul8', id: '1008', phone: '2015550108', extension: '130', email: 'drew@mou.com' },
  { firstName: 'Alex', lastName: 'Rivera', password: '+Cart9', id: '1009', phone: '2015550109', extension: '131', email: 'alex@mou.com' },
  { firstName: 'Sam', lastName: 'Turner', password: '=Van10', id: '1010', phone: '2015550110', extension: '132', email: 'sam@mou.com' }
];

const form = document.getElementById('representativeForm');
const confirmation = document.getElementById('emailConfirmation');
const emailRequired = document.getElementById('emailRequired');
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('togglePassword');

// Show/hide the password and change the toggle icon.
toggleButton.addEventListener('click', () => {
  const showing = passwordInput.type === 'password';
  passwordInput.type = showing ? 'text' : 'password';
  document.getElementById('eyeIcon').textContent = showing ? '◉̸' : '◉';
  toggleButton.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
  toggleButton.setAttribute('aria-pressed', String(showing));
});

confirmation.addEventListener('change', () => {
  emailRequired.classList.toggle('hidden', !confirmation.checked);
});

// Display one specific alert, then return focus to the offending field.
function reportError(fieldId, message) {
  alert(message);
  const field = document.getElementById(fieldId);
  field.focus();
  if (typeof field.select === 'function') field.select();
  return false;
}

function normalizePhone(value) {
  // Ten phone digits, optional 1-5 digit extension, with dashes or spaces.
  const match = value.match(/^(\d{3}[- ]?\d{3}[- ]?\d{4})\s*(?:ext\.?|extension|x)\s*(\d{1,5})$/i);
  if (!match) return null;
  return { number: match[1].replace(/[- ]/g, ''), extension: match[2] };
}

// Phase 2, function 1: validate every field using JavaScript REGEX.
function validate(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const password = passwordInput.value;
  const id = document.getElementById('representativeId').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const transaction = document.getElementById('transaction').value;

  // Names permit letters, apostrophes, hyphens and single internal spaces.
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  if (!nameRegex.test(firstName)) return reportError('firstName', 'First name is required and may contain letters, spaces, apostrophes or hyphens only.');
  if (!nameRegex.test(lastName)) return reportError('lastName', 'Last name is required and may contain letters, spaces, apostrophes or hyphens only.');

  // Starts with a special character, max 7 characters, uppercase and digit required.
  const passwordRegex = /^(?=[\s\S]{1,7}$)(?=.*[A-Z])(?=.*\d)[!@#$%^&*?+=][A-Za-z\d!@#$%^&*?+=]*$/;
  if (!passwordRegex.test(password)) return reportError('password', 'Password must be 7 characters or fewer, start with a special character (!@#$%^&*?+=), and contain at least one uppercase letter and one digit.');

  if (!/^\d{4}$/.test(id)) return reportError('representativeId', 'Representative ID must contain exactly four digits (example: 1001).');
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) return reportError('phone', 'Phone must contain 10 digits separated by optional spaces or dashes, followed by an extension (example: 201-555-0101 ext 123).');

  // The email field is required and checked only when confirmation is selected.
  if (confirmation.checked && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,5}$/.test(email)) {
    return reportError('email', 'Email confirmation is checked. Enter a valid email with @, a period, and a final domain of 2 to 5 letters (example: jordan@mou.com).');
  }
  if (!transaction) return reportError('transaction', 'Please select a transaction from the dropdown menu.');

  verify({ firstName, lastName, password, id, phone: normalizedPhone.number, extension: normalizedPhone.extension, email, transaction, confirmationRequested: confirmation.checked });
  return true;
}

// Phase 2, function 2: verify input against the global array of 10 employees.
function verify(data) {
  const found = movingRepresentatives.some(rep =>
    rep.firstName.toLowerCase() === data.firstName.toLowerCase() &&
    rep.lastName.toLowerCase() === data.lastName.toLowerCase() &&
    rep.password === data.password &&
    rep.id === data.id &&
    rep.phone === data.phone &&
    rep.extension === data.extension &&
    (!data.confirmationRequested || rep.email.toLowerCase() === data.email.toLowerCase())
  );
  if (!found) {
    alert(`An account for ${data.firstName} ${data.lastName} cannot be found. Please check your representative details.`);
    return false;
  }
  alert(`Welcome to Moving On Up, ${data.firstName} ${data.lastName}!\nSelected transaction: ${data.transaction}`);
  return true;
}

form.addEventListener('submit', validate);
form.addEventListener('reset', () => {
  passwordInput.type = 'password';
  document.getElementById('eyeIcon').textContent = '◉';
  toggleButton.setAttribute('aria-label', 'Show password');
  toggleButton.setAttribute('aria-pressed', 'false');
  emailRequired.classList.add('hidden');
});

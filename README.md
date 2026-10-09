# IT 202 – Project 1: Moving On Up (MOU)

A two-phase representative portal project for a fictional moving company.

## Files
- `index.html` – form structure (Phase One)
- `style.css` – custom design and CSS truck illustration (Phase One)
- `script.js` – regex validation, password visibility, and account verification (Phase Two)

## How to run
Open `index.html` in a web browser. Keep all three files together in the same folder.

## Test account
- First name: Jordan
- Last name: Parker
- Password: `!Move1`
- Representative ID: `1001`
- Phone: `201-555-0101 ext 123`
- Email (if confirmation checked): `jordan@mou.com`
- Transaction: choose any listed transaction

## Testing checklist
1. Submit with empty first name; verify a single alert and field focus.
2. Enter invalid last name, password, ID, phone, and email (when checkbox checked), one at a time.
3. Enter a valid-format account not in the array; verify the not-found alert includes the name.
4. Enter the sample account above; verify the welcome alert includes name and transaction.
5. Check and uncheck email confirmation; email is required only when checked.
6. Toggle password visibility and confirm the icon changes.
7. Reset the form and confirm fields and checkbox clear.

## Submission
1. Upload `index.html`, `style.css`, and `script.js` to your AFS `public_html` directory.
2. Open and test `https://web.njit.edu/~YOUR_UCID/index.html` (replace YOUR_UCID).
3. Upload all three files to your GitHub project repository.
4. Submit the AFS page URL, the source files, and your GitHub repository URL in Canvas, as directed by the instructor.

**Note:** This is a front-end classroom demonstration. Employee credentials are fictional and stored in browser-accessible JavaScript. It is not suitable for real authentication or real client information.

## Live Website

https://web.njit.edu/~bt336/MOU_Project1/index.html

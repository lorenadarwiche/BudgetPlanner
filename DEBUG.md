# Debugging EmailJS Verification

## To test fresh:

1. **Open browser console** (F12 or right-click > Inspect)
2. **Clear localStorage**:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

3. **Register with a new account**
4. **Watch the console logs** - you should see:
   ```
   === REGISTRATION DEBUG ===
   Generated verification code: 123456
   Sending to email: your@email.com
   Email sent result: {success: true, demo: false}
   ```

5. **Check your email** and copy the 6-digit code

6. **Enter the code** in the verification screen

7. **Watch the console** - you should see:
   ```
   === VERIFICATION DEBUG ===
   Stored code: 123456
   Entered code: 123456
   Match: true
   ```

## If codes don't match:

- The **Stored code** is what's saved in localStorage
- The **Entered code** is what you received in email
- If they're different, there's a timing or multiple registration issue

## Manual check:

In the browser console, check what's stored:
```javascript
JSON.parse(localStorage.getItem('users'))
```

Look for the `verificationCode` field for your user.

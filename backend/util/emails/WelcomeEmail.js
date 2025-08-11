
export function welcomeEmail(
  username = 'John',
  company = 'AI Travel Planner'
) {
  const previewText = `Welcome to ${company}, ${username}!`;
  const baseUrl = process.env.BASE_URL;
  const frontendUrl = process.env.FRONTEND_URL;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to ${company}</title>
  <style>
    /* Fallback font stack */
    body, table, td, a { font-family: Helvetica, Arial, sans-serif; }
    /* Button */
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin: 32px auto;
      background-color: #00A3FF;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
    }
    /* Container */
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 20px 0;
    }
    .container {
      max-width: 465px;
      background-color: #ffffff;
      margin: 0 auto;
      padding: 40px 20px;
      border: 1px solid #e0e0e0;
    }
    .logo {
      display: block;
      margin: 0 auto 24px;
      width: 80px;
      height: 80px;
    }
    h1 { font-size: 24px; font-weight: normal; text-align: center; margin: 24px 0; }
    p { font-size: 14px; line-height: 1.5; color: #404040; margin: 12px 0; }
  </style>
</head>
<body>
  <!-- Hidden preview text for email clients -->
  <div style="display:none; max-height:0; overflow:hidden;">${previewText}</div>

  <div class="wrapper">
    <div class="container">
      <img
        src="https://res.cloudinary.com/dqilqusff/image/upload/v1754951554/Branding_Icon_wfayil.png"
        alt="Logo"
        class="logo"
      />

      <h1>Welcome to ${company}, ${username}!</h1>

      <p>Hello ${username},</p>

      <p>
        Welcome aboard! You’ve just joined <strong>${company}</strong>, the planner that turns
        your dream trips into reality with just a few clicks.
      </p>

      <div style="text-align:center;">
        <a href="${frontendUrl}/login" class="btn">Get Started</a>
      </div>

      <p>Happy exploring,<br/>The ${company} Team</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
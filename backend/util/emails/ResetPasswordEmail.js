
export function resetPasswordEmail(
  username,
  resetPasswordLink
) {
  const previewText = `AI Travel Planner – Reset your password`;
  const baseUrl = process.env.BASE_URL;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
  <style>
    body, table, td, a {
      font-family: Helvetica, Arial, sans-serif;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 20px 0;
    }
    .container {
      max-width: 465px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 40px 20px;
    }
    .logo {
      display: block;
      margin: 0 auto 24px;
      width: 80px;
      height: 80px;
    }
    h1 {
      font-size: 20px;
      text-align: center;
      margin: 24px 0;
      color: #333333;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      color: #404040;
      margin: 12px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin: 24px auto;
      background-color: #007ee6;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <!-- Preview text for email clients -->
  <div style="display:none; max-height:0; overflow:hidden;">
    ${previewText}
  </div>

  <div class="wrapper">
    <div class="container">
      <img
        src="${baseUrl}/static/logo.png"
        alt="Logo"
        class="logo"
      />

      <h1>Reset Your Password</h1>

      <p>Hi ${username},</p>

      <p>
        Someone recently requested a password change for your AI Travel Planner account.
        If this was you, click the button below to set a new password:
      </p>

      <div style="text-align:center;">
        <a href="${resetPasswordLink}" class="btn">
          Reset Password
        </a>
      // </div>

      <p>
        If you didn’t request this, just ignore and delete this email.
        Your account is safe and no changes were made.
      </p>

      <p>Happy exploring,<br/>The AI Travel Planner Team</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
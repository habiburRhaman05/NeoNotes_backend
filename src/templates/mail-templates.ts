export const getVerificationTemplate = (name: string, link: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Base resets for consistent rendering */
      body, table, td, a { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      body { width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; background-color: #f8f9fa; }
      
      .wrapper { padding: 40px 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; }
      .main-card { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; border-top: 8px solid #d32f2f; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
      .header { text-align: center; padding: 40px 20px 20px; }
      .header h1 { color: #d32f2f; margin: 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
      
      .content { padding: 0 40px 30px; text-align: center; color: #444444; line-height: 1.6; }
      .content p { margin-bottom: 20px; font-size: 16px; }
      
      /* Button Styling */
      .button-wrapper { padding: 20px 0; }
      .btn { 
        background-color: #d32f2f; 
        color: #ffffff !important; 
        padding: 16px 32px; 
        text-decoration: none; 
        border-radius: 8px; 
        font-weight: bold; 
        display: inline-block;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }
      
      /* Fallback link styling */
      .fallback-link { 
        font-size: 12px; 
        color: #999999; 
        word-break: break-all; 
        margin-top: 30px; 
        padding: 15px; 
        background-color: #fcfcfc; 
        border: 1px solid #eeeeee; 
        border-radius: 4px; 
      }
      
      .footer { text-align: center; padding: 0 40px 40px; font-size: 13px; color: #aaaaaa; }
      .expiry { font-weight: bold; color: #d32f2f; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="main-card">
        <div class="header">
          <h1>Confirm Your Email</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Welcome to <strong>red-blog.com</strong>! To activate your account and start sharing your thoughts with the community, please verify your email address below:</p>
          
          <div class="button-wrapper">
            <a href="${link}" class="btn" target="_blank">Verify Email Address</a>
          </div>
          
          <p>This link confirms that you own this address. For your security, this link will <span class="expiry">expire in 24 hours</span>.</p>
          
          <div class="fallback-link">
            If the button doesn't work, copy and paste this link into your browser: <br>
            <a href="${link}" style="color: #d32f2f;">${link}</a>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2025 red-blog.com | Tech & Insights</p>
          <p>If you did not sign up for an account, you can safely ignore this email.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

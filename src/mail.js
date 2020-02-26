const SendGrid = require('@sendgrid/mail');

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendTransactionalEmail = async (emailData) => {
  const mailSettings = {};

  // This will send the email in sandbox mode
  if (process.env.NODE_ENV !== 'production') {
    mailSettings.mail_settings = {
      sandbox_mode: {
        enable: true,
      },
    };
  }

  const data = {
    ...emailData,
    ...mailSettings
  };

  return SendGrid.send(data);
    // {
    //   to,
    //   from,
    //   subject,
    //   text,
    //   html,
    //   // templateId: 'd-f43daeeaef504760851f727007e0b5d0',
    //   // dynamic_template_data: {
    //   //   subject: 'Testing Templates',
    //   //   name: 'Some One',
    //   //   city: 'Denver',
    //   // },
    // },
};

module.exports.sendTransactionalEmail = sendTransactionalEmail;

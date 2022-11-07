const loginButtons = [
  {
    larger: 'true',
    type: 'primary',
    htmlType: 'submit',
    buttonText: 'Login',
    Link: false,
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'New Adult',
    Link: '/register/adult/part1',
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Forgot Password? Use Forgot Question',
    Link: '/forgotpassword/question',
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Forgot Password? Find by Email',
    Link: '/forgotpassword/email',
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Back to Main Page',
    Link: '/',
  },
];

export default loginButtons;

const dashboardIcons = [
  {
    title: 'My Stats',
    type: 'primary',
    link: '/stats/', // :user
    linkId: true,
  },
  {
    title: 'Class Leaderboard',
    type: 'default',
    link: '/classes/leaderboard/', // :class
    linkId: true,
  },
  {
    title: 'Account',
    type: 'default',
    link: '/account',
    linkId: false,
  },
  {
    title: 'Logout',
    type: 'primary',
    link: '/logout',
    linkId: false,
  },
];

export default dashboardIcons;

const dashboardIcons = [
  {
    title: 'My Classes',
    blueColor: 'blue',
    link: '/classes/', // :teacherId
    linkId: true,
  },
  {
    title: 'Create a Class',
    blueColor: 'white',
    link: '/classes/create',
    linkId: false,
  },
  {
    title: 'Create Challenge',
    blueColor: 'blue',
    link: '/challenge/create',
    linkId: false,
  },
  {
    title: 'Play as a Guest',
    blueColor: 'white',
    link: '/guestuser',
    linkId: false,
  },
  {
    title: 'Update Account',
    blueColor: 'blue',
    link: '/profile/', // :teacherId
    linkId: true,
  },
  {
    title: 'Logout',
    blueColor: 'white',
    link: '/logout',
    linkId: false,
  },
];

export default dashboardIcons;

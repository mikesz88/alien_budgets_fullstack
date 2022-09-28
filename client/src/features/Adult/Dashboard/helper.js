const dashboardIcons = [
  {
    title: 'My Classes',
    type: 'primary',
    link: '/classrooms/teacher/', // :teacherId
    linkId: true,
  },
  {
    title: 'Create a Class',
    type: 'default',
    link: '/classrooms/create',
    linkId: false,
  },
  {
    title: 'Create Challenge',
    type: 'primary',
    link: '/challenge/create',
    linkId: false,
  },
  {
    title: 'Play as a Guest',
    type: 'default',
    link: '/guestuser',
    linkId: false,
  },
  {
    title: 'Account',
    type: 'primary',
    link: '/account',
    linkId: false,
  },
  {
    title: 'Logout',
    type: 'default',
    link: '/logout',
    linkId: false,
  },
];

export default dashboardIcons;

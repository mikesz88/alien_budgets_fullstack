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

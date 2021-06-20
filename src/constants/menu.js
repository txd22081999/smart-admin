const data = [
  // {
  //   id: 'gogo',
  //   icon: 'iconsminds-home-1',
  //   label: 'menu.home',
  //   to: '/app/gogo',
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.home',
  //       to: '/app/gogo/home',
  //     },
  //   ],
  // },
  {
    id: 'home',
    icon: 'iconsminds-home-1',
    label: 'menu.home',
    to: '/app/home',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.home',
        to: '/app/home/sub-home',
      },
    ],
  },
  {
    id: 'dishes',
    icon: 'iconsminds-chef-hat',
    label: 'menu.dishes',
    to: '/app/dishes',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: '/app/dishes/dishes',
      },
    ],
  },
  {
    id: 'topping',
    icon: 'bx bx-drink',
    label: 'menu.topping',
    to: '/app/toppings',
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.second',
    //     to: '/app/dishes/dishes',
    //   },
    // ],
  },
  {
    id: 'staffs',
    icon: 'iconsminds-user',
    label: 'menu.staffs',
    to: '/app/staffs',
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.second',
    //     to: '/app/dishes/dishes',
    //   },
    // ],
  },
  {
    id: 'anylytics',
    icon: 'iconsminds-monitor-analytics',
    label: 'menu.analytics',
    to: '/app/analytics',
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.second',
    //     to: '/app/anylitics/anylitics',
    //   },
    // ],
  },
  {
    id: 'map',
    icon: 'iconsminds-monitor-analytics',
    label: 'menu.map',
    to: '/app/map',
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.second',
    //     to: '/app/anylitics/anylitics',
    //   },
    // ],
  },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: '/app/blank-page',
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
]
export default data

export interface NavigationItem {
  path: string;
  labelKey: string;
}

export const publicNavigationItems: NavigationItem[] = [
  {
    path: '/services',
    labelKey: 'navigation.services'
  },
  {
    path: '/pricing',
    labelKey: 'navigation.pricing'
  },
  {
    path: '/help',
    labelKey: 'navigation.help'
  }
];

export const authNavigationItems: NavigationItem[] = [
  {
    path: '/login',
    labelKey: 'auth.login.title'
  },
  {
    path: '/register',
    labelKey: 'auth.register.title'
  }
];
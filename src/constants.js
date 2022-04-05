import homeIcon from './assets/icons/home.svg';
import featuresIcon from './assets/icons/features.svg';
import registerIcon from './assets/icons/account.svg';
import verifiedIcon from './assets/icons/verified.svg';
import discountIcon from './assets/icons/discount.svg';
import giftIcon from './assets/icons/gift.svg';
import settingsIcon from './assets/icons/setting.svg';

export const NavLinks = [
  { name: 'Home', href: '/', icon: homeIcon },
  { name: 'Features', href: '#features', icon: featuresIcon },
  { name: 'Sign In', href: '/login', icon: verifiedIcon },
  { name: 'Sign Up', href: '/register', icon: registerIcon },
];

export const DashboardLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: homeIcon },
  { name: 'Upload', href: '/upload', icon: featuresIcon },
  { name: 'Files', href: '/files', icon: giftIcon },
  { name: 'Profile', href: '/profile', icon: settingsIcon },
];

export const FileAttributes = ['Name', 'Size', 'Type', 'Upload Date'];

export const Filters = [
  { name: 'Images', value: 'images' },
  { name: 'Videos', value: 'videos' },
  { name: 'Music', value: 'music' },
  { name: 'Others', value: 'others' },
];

export const Features = [
  {
    description:
      'The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.',
    icon: featuresIcon,
  },
  {
    description:
      "Whether you're sharing holidays photos or work documents, Cloudy has you covered allowing for all file types to be shared.",
    icon: discountIcon,
  },

  {
    description:
      'All your privacy is kept safe at Cloudy. Authentication and encryption are security features that will allow to help secure your data.',
    icon: giftIcon,
  },
];

const BREAK_POINTS = {
  phoneSmaller: 400,
  phone: 600,
  tabletSmall: 850,
  tablet: 980,
  laptop: 1300,
};

export const MediaQueries = {
  phoneSmaller: `(max-width: ${BREAK_POINTS.phoneSmaller / 16}rem)`,
  phone: `(max-width: ${BREAK_POINTS.phone / 16}rem)`,
  tablet: `(max-width: ${BREAK_POINTS.tablet / 16}rem)`,
  tabletSmall: `(max-width: ${BREAK_POINTS.tabletSmall / 16}rem)`,
  laptop: `(max-width: ${BREAK_POINTS.laptop / 16}rem)`,
};

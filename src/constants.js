import HomeIcon from './assets/icons/home.svg';
import FeaturesIcon from './assets/icons/features.svg';
import RegisterIcon from './assets/icons/account.svg';
import Verified from './assets/icons/verified.svg';
import DiscountIcon from './assets/icons/discount.svg';
import GiftIcon from './assets/icons/gift.svg';

export const NavLinks = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Features', href: '#features', icon: FeaturesIcon },
  { name: 'Sign In', href: '/login', icon: Verified },
  { name: 'Sign Up', href: '/register', icon: RegisterIcon },
];

export const DashboardLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Upload', href: '/upload', icon: FeaturesIcon },
  { name: 'Files', href: '/files', icon: Verified },
  { name: 'Profile', href: '/profile', icon: RegisterIcon },
];

export const FileAttributes = ['Name', 'Size', 'Type', 'Upload Time'];

export const Features = [
  {
    description:
      'The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.',
    icon: FeaturesIcon,
  },
  {
    description:
      'Whether youre sharing holidays photos or work documents, Cloudy has you covered allowing for all file types to be shared.',
    icon: DiscountIcon,
  },

  {
    description:
      'All your privacy is kept safe at Cloudy. Authentication and encryption are security features that will allow to help secure your data.',
    icon: GiftIcon,
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

import {
  ChipIcon,
  ClipboardListIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  TableIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'

const merchantConfig = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    href: '/merchant',
  },
  {
    icon: <TableIcon />,
    label: 'Plans',
    href: '/merchant/plan',
  },
  {
    icon: <UserGroupIcon />,
    label: 'Subscriptions',
    href: '/merchant/subscription',
  },
  {
    icon: <CurrencyDollarIcon />,
    label: 'Invoices',
    href: '/merchant/invoice',
  },
  {
    icon: <ChipIcon />,
    label: 'Integration',
    href: '/merchant/integration',
  },
]

const consumerConfig = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    href: '/consumer',
  },
  {
    icon: <ClipboardListIcon />,
    label: 'My Subscriptions',
    href: '/consumer/subscription',
  },
  {
    icon: <CreditCardIcon />,
    label: 'My Invoices',
    href: '/consumer/invoice',
  },
]

const config = {
  merchant: merchantConfig,
  consumer: consumerConfig,
}

export default config

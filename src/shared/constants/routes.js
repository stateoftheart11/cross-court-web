import { TAB_QUERY_PARAM } from 'shared/components/Tabs';

import { BILLING_TAB } from './tabs';

export default {
  ABOUT_YOURSELF: '/about-yourself',
  BILLING: `/settings?${TAB_QUERY_PARAM}=${BILLING_TAB}`,
  CAREERS: '/careers',
  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMED: '/checkout/confirmed',
  CHECKOUT_MEMBERSHIP_CONFIRMED: '/checkout/membership',
  CONTENT: '/content',
  DASHBOARD: '/dashboard',
  FAQ: '/faq',
  FIRSTSESSIONRESERVED: '/first-session/reserved',
  GALLERY: '/gallery',
  GOALS: '/goals',
  HOME: '/',
  LOCATIONS: '/locations',
  LOCATIONSFIRST: '/locations-first',
  LOGIN: '/login',
  MANAGE_MEMBERSHIP: '/manage-membership',
  MEMBERSHIPS: '/memberships',
  MYACCOUNT: '/my-account',
  NOT_FOUND: '/404',
  ONBOARDING_PERSONAL_DETAILS: '/onboarding/personal-details',
  OPEN_CLUB_SESSION: '/session/:id/:date/open-club',
  PAYMENT_METHODS: '/payment-methods',
  PAYMENT_METHODS_ADD: '/payment-methods/add',
  PAYMENT_METHODS_SELECT: '/payment-methods/select',
  PRIVACY_POLICY: '/privacy-policy',
  PWA: '/app',
  RATING: '/rating',
  REFERRALS: '/my-account/referrals',
  RULES: '/rules',
  SESSION: '/session/:id/:date',
  SESSIONCONFIRMED: '/session/confirmed',
  SESSIONRESERVED: '/session/reserved',
  SETTINGS: '/settings',
  SIGNUP: '/signup',
  SIGNUP_VERIFICATION: '/signup/verification',
  SIGNUP_CONFIRMATION: '/signup/confirmation',
  SKLZ_SESSION: '/session/:id/:date/sklz',
  TERMS: '/terms-and-conditions',
  WHY_JOIN: '/why-join',
};

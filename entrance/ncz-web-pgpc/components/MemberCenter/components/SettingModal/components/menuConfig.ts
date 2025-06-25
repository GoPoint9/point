import { $t } from '@/languages'

export const settingModalComponentEntries = Object.entries(import.meta.glob('./*.vue'))

export const settingModalMenus = [
  { name: $t('label_setting_data'), className: 'js_profile', icon: 'icon-info', page: 'ProfileFrom' },
  { name: $t('label_pwd_login'), className: 'js_loginPassword', icon: 'icon-pwd', page: 'LoginPasswordForm' },
  { name: $t('label_bank_bind'), className: 'js_bankCards', icon: 'icon-bank', page: 'BankCardsForm' },
  { name: $t('label_ewallet_bind'), className: 'js_eWallet', icon: 'icon-eWallet', page: 'EWalletForm' },
  { name: $t('label_pwd_pay'), className: 'js_withdrawPassword', icon: 'icon-moneypwd', page: 'WithdrawPasswordForm' },
  { name: $t('label_phone_verify'), className: 'js_mobileVerified', icon: 'icon-phone', page: 'MobileVerifiedForm' },
  // { name: $t('label_realname_verify') , className: 'js_idVerification', icon: 'icon-realname' , page: ''    ,  },
  // { name: $t('label_cpf_verify') , className: 'js_cpfVerification', icon: 'icon-realname' , page: ''    ,  },
  // { name: $t('label_google_verify') , className: 'js_bindGA', icon: 'icon-google' , page: ''    ,  },
  // { name: $t('bind_virtual_wallet') , className: 'js_vitualWallet', icon: 'icon-vitualWallet' , page: ''    ,  },
  // { name: $t('label_secret_setting') , className: 'js_securityQuestions', icon: 'icon-secret' , page: ''    ,  },
]

// const detailMap = {
//   js_profile: $t('info_setting_profile'),
//   js_idVerification: $t('info_setting_idverification'),
//   js_cpfVerification: $t('info_setting_cpfverification'),
//   js_loginPassword: $t('info_setting_loginPwd'),
//   js_bindGA: $t('info_setting_google'),
//   js_bankCards: $t('info_setting_bank'),
//   js_eWallet: $t('bind_ewallet_card_title'),
//   js_vitualWallet: $t('info_setting_virtual'),
//   js_withdrawPassword: $t('info_setting_payPwd'),
//   js_securityQuestions: $t('info_setting_secret'),
//   js_mobileVerified: $t('info_setting_phone'),
//   js_logout: $t('info_setting_logout'),
// }
// const logoutItem = { name: $t('label_logout'), className: 'js_logout', icon: 'icon-logout', detail: $t('info_setting_logout') }
// export const accountInformationMenus = [
//   ...settingModalMenus,
//   logoutItem,
// ].map(i => ({ ...i, detail: detailMap[i.className] }))

/**
  js_profile_from:   info-model setting-item
  js_loginPassword_from:   pwd-model setting-item
  js_bankCards_from:   bank-card-model setting-item js_bankCards_from
  js_eWallet_from:   bank-card-model setting-item js_eWallet_from
  js_virtualWallet_from:   bank-card-model setting-item js_virtualWallet_from
  js_mobileVerified_from:   phone-model setting-item
  js_verified_Phone:   phone-model setting-item
 */

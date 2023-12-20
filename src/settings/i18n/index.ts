import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    fa: {
      translation: {
        title: 'صندوق سرمایه‌گذاری خصوصی درنیکو',
        common: {
          amount: 'مبلغ',
          cancel: 'انصراف',
          create: 'ساخت',
          date: 'تاریخ',
          deposit: 'واریز',
          description: 'توضیحات',
          edit: 'ویرایش',
          enter: 'ورود',
          exit: 'خروج',
          optional: 'اختیاری',
          submit: 'ثبت',
          unit: 'واحد',
          withdraw: 'برداشت',
          profit: 'سود',
          detriment: 'زیان'
        },
        units: {
          rial: 'ریال',
          derham: 'درهم',
          dollar: 'دلار',
          euro: 'یورو',
        },
        user: {
          username: 'نام کاربری',
          password: 'رمز عبور',
          firstname: 'نام',
          lastname: 'نام خانوادگی',
          nationalNo: 'شماره ملی',
        },
        lastTransactionDate: 'تاریخ آخرین تراکنش',
        financial: 'دارایی فعلی در صندوق',
        yourFinance: 'دارایی شما:',
        totalProfit: 'مجموع سود دریافتی',
        createNewUser: 'ساخت کاربر جدید',
        userInformation: 'اطلاعات کاربر',
        usersList: 'فهرست کاربران',
        submitTransaction: 'ثبت تراکنش مالی',
        submitProfit: 'ثبت سود',
        userManagement: 'مدیریت اطلاعات کاربران',
        transactionType: 'نوع (واریز یا برداشت)',
        userTransactionsUnit: 'واحد تراکنش‌های کاربر',
        profitTable: 'جدول سودها',
        transactionTable: 'جدول تراکنش‌ها',
        messages: {
          wrongCredential: 'نام کاربری یا رمز عبور اشتباه است',
          successfulLogin: 'با موفقیت وارد شدید',
          successful: 'با موفقیت ثبت شد',
          error: 'مشکلی پیش آمد',
          nonZeroAmount: 'مبلغ نمی‌تواند صفر باشد',
          successfulLogout: 'با موفقیت از حساب کابری خارج شدید'
        },
        inform: {
          thereIsNoUserYet: 'هنوز کاربری ساخته نشده است',
          thereIsNoTransactionYet: 'تراکنشی ثبت نشده است',
          thereIsNotProfitYet: 'سودی ثبت نشده است',
          empty: 'وارد نشده',
          usernameMustBeUnique: 'نام کاربری باید یکتا باشد'
        },
      },
    },
  },
  lng: 'fa', // if you're using a language detector, do not define the lng option
  fallbackLng: 'fa',

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
})

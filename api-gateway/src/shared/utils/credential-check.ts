import { EMAIL_REGEX } from './constants/regex.constant';

export function checkIsEmail(email: string): boolean {
  if (EMAIL_REGEX.test(email)) {
    return true;
  } else {
    return false;
  }
}

export function checkIsPhone(phone: string): boolean {
  if (phone.length >= 13) {
    return true;
  } else {
    return false;
  }
}

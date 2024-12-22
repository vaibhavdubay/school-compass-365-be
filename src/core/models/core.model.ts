import { Role } from '@sc-enums/role';
import { TEMPLATE } from '@sc-enums/template';

export type MailOptions = ACCOUNT_REGISTRATION_EMAIL | PASSWORD_RESET_EMAIL | OTP_SENT_EMAIL;

interface ACCOUNT_REGISTRATION_EMAIL {
  readonly template: TEMPLATE.ACCOUNT_REGISTRATION;
  to: string;
  subject: string;
  data: {
    userName: string;
    password: string;
    name: string;
    role: Role;
    schoolName: string;
    screen?: string;
  };
}

interface PASSWORD_RESET_EMAIL {
  readonly template: TEMPLATE.PASSWORD_RESET;
  to: string;
  subject: string;
  data: {
    userName: string;
    link: string;
    name: string;
    role: Role;
    screen?: string;
  };
}
interface OTP_SENT_EMAIL {
  readonly template: TEMPLATE.PASSWORD_RESET_OTP;
  to: string;
  subject: string;
  data: {
    userName: string;
    name: string;
    otp: string;
    role: Role;
    screen?: string;
  };
}

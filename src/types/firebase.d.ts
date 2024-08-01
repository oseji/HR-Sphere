// firebase-config.d.ts
declare module '../config/firebase' {
  import { getAuth } from 'firebase/auth';
  export const auth: getAuth;
}
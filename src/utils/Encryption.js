import CryptoJS from 'react-native-crypto-js';

export async function encryptText(text, secret) {
  let chiperText = await CryptoJS.AES.encrypt(text, secret).toString();
  return chiperText;
}

export async function decryptText(dechiperText, secret) {
  let dt = await CryptoJS.AES.decrypt(dechiperText, secret);
  dt = dt.toString(CryptoJS.enc.Utf8);
  return dt;
}

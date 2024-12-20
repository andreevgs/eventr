/*
 * JavaScript base64 / base64url encoder and decoder
 */

const b64c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // base64 dictionary
const b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"; // base64url dictionary
const b64pad = "=";

/* base64_encode_data
 * Internal helper to encode data to base64 using specified dictionary.
 */
function base64_encode_data(data: string, len: number, b64x: string) {
  let dst = "";
  let i;

  for (i = 0; i <= len - 3; i += 3) {
    dst += b64x.charAt(data.charCodeAt(i) >>> 2);
    dst += b64x.charAt(
      ((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i + 1) >>> 4)
    );
    dst += b64x.charAt(
      ((data.charCodeAt(i + 1) & 15) << 2) | (data.charCodeAt(i + 2) >>> 6)
    );
    dst += b64x.charAt(data.charCodeAt(i + 2) & 63);
  }

  if (len % 3 == 2) {
    dst += b64x.charAt(data.charCodeAt(i) >>> 2);
    dst += b64x.charAt(
      ((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i + 1) >>> 4)
    );
    dst += b64x.charAt((data.charCodeAt(i + 1) & 15) << 2);
    dst += b64pad;
  } else if (len % 3 == 1) {
    dst += b64x.charAt(data.charCodeAt(i) >>> 2);
    dst += b64x.charAt((data.charCodeAt(i) & 3) << 4);
    dst += b64pad;
    dst += b64pad;
  }

  return dst;
}

/* base64_encode
 * Encode a JavaScript string to base64.
 * Specified string is first converted from JavaScript UCS-2 to UTF-8.
 */
export function base64_encode(str: string) {
  const utf8str = unescape(encodeURIComponent(str));
  return base64_encode_data(utf8str, utf8str.length, b64c);
}

/* base64url_encode
 * Encode a JavaScript string to base64url.
 * Specified string is first converted from JavaScript UCS-2 to UTF-8.
 */
export function base64url_encode(str: string) {
  const utf8str = unescape(encodeURIComponent(str));
  return base64_encode_data(utf8str, utf8str.length, b64u);
}

/* base64_charIndex
 * Internal helper to translate a base64 character to its integer index.
 */
function base64_charIndex(c: string) {
  if (c == "+") return 62;
  if (c == "/") return 63;
  return b64u.indexOf(c);
}

/* base64_decode
 * Decode a base64 or base64url string to a JavaScript string.
 * Input is assumed to be a base64/base64url encoded UTF-8 string.
 * Returned result is a JavaScript (UCS-2) string.
 */
export function base64_decode(data: string) {
  let dst = "";
  let i, a, b, c, d;

  for (i = 0; i < data.length - 3; i += 4) {
    a = base64_charIndex(data.charAt(i + 0));
    b = base64_charIndex(data.charAt(i + 1));
    c = base64_charIndex(data.charAt(i + 2));
    d = base64_charIndex(data.charAt(i + 3));

    dst += String.fromCharCode((a << 2) | (b >>> 4));
    if (data.charAt(i + 2) != b64pad)
      dst += String.fromCharCode(((b << 4) & 0xf0) | ((c >>> 2) & 0x0f));
    if (data.charAt(i + 3) != b64pad)
      dst += String.fromCharCode(((c << 6) & 0xc0) | d);
  }

  dst = decodeURIComponent(escape(dst));
  return dst;
}

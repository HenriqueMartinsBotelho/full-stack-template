export function getBrowserName(ua: string): string {
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/edg/i.test(ua)) return 'Edge';
  if (/opera|opr/i.test(ua)) return 'Opera';
  return 'Unknown';
}

export function getBrowserVersion(ua: string): string {
  const match = ua.match(/(chrome|firefox|safari|edg|opr)\/([\d\.]+)/i);
  return match?.[2] || 'Unknown';
}

export function getOSName(ua: string): string {
  if (/windows nt/i.test(ua)) return 'Windows';
  if (/mac os x/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Unknown';
}

export function generateDeviceId(): string {
  return 'web-' + Math.random().toString(36).substr(2, 9);
}

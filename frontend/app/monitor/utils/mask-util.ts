import { isNumber } from 'lodash';

export const mask = {
  cpf: (cpf: string) => {
    if (cpf.length === 11) {
      const first = cpf.slice(0, 3);
      const last = cpf.slice(cpf.length - 2);
      return first + '******' + last;
    } else {
      return null;
    }
  },
  phone: (phone: string) => {
    if (phone && phone?.length === 11) {
      const first = phone.slice(0, 6);
      const last = phone.slice(phone.length - 2);
      return first + '***' + last;
    } else {
      return null;
    }
  },
  birthDate: (birthDate: any) => {
    try {
      const date = isNumber(birthDate)
        ? new Date(birthDate).toISOString()
        : birthDate;
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      return `****-${month}-${day}`;
    } catch (e) {
      return null;
    }
  },
  url: (url: string) => {
    const regex = /([^?=&]+)(=([^&]*))?/g;
    const params: any = {};

    let match: RegExpExecArray | null;
    while ((match = regex.exec(url)) !== null) {
      params[match[1]] = match[3];
    }

    for (const param of Object.keys(params)) {
      url = url.replace(
        new RegExp(`${param}=${params[param]}`, 'g'),
        `${param}={${param}}`
      );
    }

    const uuidPattern =
      /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
    url = url.replace(uuidPattern, '{uuid}');

    const datePattern =
      /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?\b/g;
    url = url.replace(datePattern, '{date}');

    const numberPattern = /\b\d[\d-]*\d\b/g;
    url = url.replace(numberPattern, '{number}');

    return url;
  },
};

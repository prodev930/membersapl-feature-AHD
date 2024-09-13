import dayjs from 'dayjs';
import {LINK_URL_REGEX} from '@util';

export function isSameDay(currentMessage: any, diffMessage: any) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

//Logic check và loại bỏ các phần tử mảng trùng lặp
export function convertArrUnique(arr: any, comp: any) {
  const unique = arr
    .map((e: any) => e[comp])
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);

  return unique;
}

export const validateLink = (text: any) => {
  return LINK_URL_REGEX.test(text);
};

function replaceAll(str: any, map: any) {
  for (let key in map) {
    str = str.split(key).join(map[key]);
  }
  return str;
}

export const convertString = (str: any = '') => {
  let text = '';
  let rv: any = {};
  const regex = /%%(.+?)!!/g;
  const listID = str?.match(regex);
  if (listID) {
    listID?.forEach((item: any) => {
      rv[`${item}`] = '';
    });
  }
  text = replaceAll(str, rv) || '';
  text = text.replace(/\[(\/*)(title|info|hr|bold|red)\]/g, '');
  text = text.replace(/<br>/g, '\n');
  return text;
};

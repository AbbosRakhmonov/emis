import { localStorageGetItem } from '@/src/utils/storage-available';
import { customDateFormat } from './dateUtils';

/**
 * Кодирует переданный массив байтов в формат Base64URL.
 * @param str ArrayBuffer - входной массив байтов.
 * @returns string - Base64URL строка.
 */
export function base64urlencode(str: ArrayBuffer): string {
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(str))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Генерирует хэш SHA-256 для переданной строки.
 * @param plain string - входная строка.
 * @returns Promise<ArrayBuffer> - хэш SHA-256 в виде массива байтов.
 */
export function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

/**
 * Генерирует PKCE-челлендж из версификатора.
 * @param v string - версификатор.
 * @returns Promise<string> - PKCE-челлендж в формате Base64URL.
 */
export async function pkceChallengeFromVerifier(v: string): Promise<string> {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
}

/**
 * Генерирует случайную строку длиной 56 символов (28 байтов).
 * @returns string - случайная строка.
 */
export function generateRandomString(): string {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => `0${dec.toString(16)}`.slice(-2)).join('');
}

interface Option {
  value: string;
  label: string;
}

interface MapToOptionsParams<T> {
  data: T[] | undefined;
  valueKey: keyof T;
  labelKey: keyof T;
  defaultLabel?: string;
}

export function mapToOptions<T>({
  data,
  valueKey,
  labelKey,
  defaultLabel = 'Без имени',
}: MapToOptionsParams<T>): Option[] {
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    value: String(item[valueKey]),
    label: item[labelKey] ? String(item[labelKey]) : defaultLabel,
  }));
}

export function getPassportDetails(value: string) {
  const parts = value.split(' ');
  const series = parts[0] || '';
  const number = parts[1] || '';

  return { series, number };
}

/**
 * Функция для обработки пустых или неопределённых значений.
 * @param value Значение для отображения.
 * @param fallback Значение по умолчанию, если `value` пусто.
 */
export const renderColumnValue = (
  value: string | undefined,
  fallback: string = '-'
) => value || fallback;

export function getOrganizationFromStorage() {
  const organizationData =
    localStorageGetItem('department') || localStorageGetItem('organization');

  if (!organizationData) {
    return null;
  }

  try {
    return JSON.parse(organizationData);
  } catch (error) {
    console.log('Ошибка при разборе JSON:', error);
    return null;
  }
}

export function mapEnumToSelectData(enumObject: any) {
  return Object.keys(enumObject).map((key) => ({
    value: enumObject[key],
    label: enumObject[key],
  }));
}

export function transformPayload(data: any) {
  const { patient, analyses, personalDataIssuedDate } = data;
  const organization = getOrganizationFromStorage();

  return analyses.map((analyse: any) => ({
    fundingStatus: analyse.fundingStatus,
    organizationId: Number(organization.id),
    initialConclusion: analyse.initialConclusion,
    applicationTypeId: Number(analyse.applicationTypeId) || null,
    analyseNameOfLoinc:
      analyse.analyseNameOfLoinc || analyse.analyseDetails.loinc || '',
    analyseCodeOfLoinc:
      analyse.analyseCodeOfLoinc || analyse.analyseDetails.loinc || '',
    analyseDetails: {
      comment: analyse.analyseDetails.comment,
      analyseTypeId: Number(analyse.analyseDetails.analyseTypeId),
      executionPriority: analyse.analyseDetails.executionPriority,
      measurementUnitId: Number(analyse.analyseDetails.measurementUnitId),
      typeBiomaterialId: Number(analyse.analyseDetails.typeBiomaterialId),
    },
    sendDetails: {
      numberOfSamples: Number(analyse.sendDetails.numberOfSamples),
      fullNameOfRecipient: analyse.sendDetails.fullNameOfRecipient,
      senderOrganizationInn: analyse.sendDetails.senderOrganizationInn,
      fullNameOfDeliveryMan: analyse.sendDetails.fullNameOfDeliveryMan,
      senderOrganizationName: analyse.sendDetails.senderOrganizationName,
      phoneNumberDeliveryMan: analyse.sendDetails.phoneNumberDeliveryMan,
      fullNameOfReferringDoctor: analyse.sendDetails.fullNameOfReferringDoctor,
      sendDateOfAnalyse: customDateFormat(
        analyse.sendDetails.sendDateOfAnalyse
      ),
      sampleArrivedDate: customDateFormat(
        analyse.sendDetails.sampleArrivedDate
      ),
    },
    patient: {
      email: '', // Поле email пустое, можно заполнить
      passportSerial: '', // Укажите значение, если есть
      passportNumber: '', // Укажите значение, если есть
      address: patient.address,
      pnfl: patient.pnfl || '', // Укажите значение, если есть
      username: patient.username,
      lastName: patient.lastName,
      photo: patient.photo || '',
      firstName: patient.firstName,
      gender: patient.gender === 1, // true для мужского пола
      middleName: patient.middleName,
      nationality: patient.nationality,
      regionId: Number(patient.regionId),
      districtId: Number(patient.districtId),
      isAnonymous: patient.isAnonymous || false,
      dateOfBirth: customDateFormat(patient.dateOfBirth),
      personalDataIssuedDate: customDateFormat(personalDataIssuedDate),
    },
  }));
}

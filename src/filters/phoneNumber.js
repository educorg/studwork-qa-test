import { formatPhoneNumber } from '@/utils/phoneCountryRules';

export default value => value ? formatPhoneNumber(value) : 'номер не указан';

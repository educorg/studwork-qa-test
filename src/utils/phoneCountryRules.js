import spaceNumber from '../filters/spaceNumber';

export const phoneCountryRules = [
  {
    id: 1,
    code: '7',
    title: 'Россия',
    icon: 'russia',
    readonly: true,
    regexp: /^\+?(7)([0-58-9]\d*)/,
    format: '+# (###) ### ##-##',
    mask: '### ### ## ##',
  },
  {
    id: 2,
    code: '380',
    title: 'Украина',
    icon: 'ukraine',
    regexp: /^\+?(380)(\d*)/,
    format: '+### ## ### ##-##',
    mask: '### ### ## ##',
  },
  {
    id: 3,
    code: '375',
    title: 'Беларусь',
    icon: 'belarus',
    regexp: /^\+?(375)(\d*)/,
    format: '+### (###) ##-##-##',
    mask: '### ## ## ##',
  },
  {
    id: 4,
    code: '7',
    title: 'Казахстан',
    icon: 'kazakhstan',
    regexp: /^\+?(7)([67]\d*)/,
    format: '+# (###) ### ##-##',
    mask: '### ### ## ##',
  },
  {
    id: 5,
    code: '998',
    title: 'Узбекистан',
    icon: 'uzbekistn',
    regexp: /^\+?(998)(\d*)/,
    format: '+### ## ### ##-##',
    mask: '## ### ## ##',
  },
  {
    id: 999,
    code: '',
    title: 'Другая страна',
    icon: '',
    regexp: /^\+?(\d+)/,
    format: '+# (###) ### ##-##',
    mask: '# ### ### ## ## ### ###',
  },
];

export const getPlainPhoneNumber = phoneNumber => phoneNumber.replace(/\D/g, '');

export const findCountryRulesByNumber = phoneNumber =>
  phoneCountryRules.find(({ regexp }) => regexp.test(getPlainPhoneNumber(phoneNumber)));

export const extractNumberParts = phoneNumber => {
  const plainPhoneNumber = getPlainPhoneNumber(phoneNumber);
  const parts = { code: '', number: '' };
  const rules = findCountryRulesByNumber(phoneNumber) || findCountryRulesById(999);
  const matches = plainPhoneNumber.match(rules.regexp);

  if (!matches) {
    parts.number = plainPhoneNumber;
  } else if (matches.length < 3) {
    parts.number = matches[1] || '';
  } else {
    parts.code = matches[1];
    parts.number = matches[2];
  }

  return parts;
};

export const findCountryRulesById = id => phoneCountryRules.find(v => v.id === id);

export const defaultPhoneCountryRules = findCountryRulesById(1);

export const formatNumber = (format, phoneNumber) => {
  const plainPhoneNumber = phoneNumber.replace(/\D+/g, '');
  let formattedPhoneNumber = format;

  for (let i = 0; i < plainPhoneNumber.length; i++) {
    if (formattedPhoneNumber.includes('#') === -1) {
      formattedPhoneNumber = [
        formattedPhoneNumber,
        spaceNumber(plainPhoneNumber.slice(i)),
      ].join(' ');
      break;
    }

    formattedPhoneNumber = formattedPhoneNumber.replace('#', plainPhoneNumber[i]);
  }

  if (formattedPhoneNumber.includes('#') !== -1) {
    formattedPhoneNumber = formattedPhoneNumber.replace(/#/g, '');
  }

  return formattedPhoneNumber.trim();
};

export const formatPhoneNumber = phoneNumber => {
  if (!phoneNumber) return;
  const rules = findCountryRulesByNumber(phoneNumber) || findCountryRulesById(999);
  return formatNumber(rules.format, phoneNumber);
};

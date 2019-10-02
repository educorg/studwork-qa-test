import {
  getPlainPhoneNumber,
  phoneCountryRules,
  findCountryRulesByNumber,
  findCountryRulesById,
  defaultPhoneCountryRules,
  extractNumberParts,
  formatNumber,
} from '../../utils/phoneCountryRules';

export default {
  props: {
    value: { type: String },
    disabled: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
  },

  data() {
    return {
      code: '',
      number: '',

      focus: false,
      opened: false,
      rules: {},
      countryCodes: phoneCountryRules,

      nativeSelect: false,
    };
  },

  computed: {
    selectedCountry: {
      get() {
        return this.rules.id;
      },

      set(newVal) {
        this.rules = findCountryRulesById(newVal);
        this.code = this.rules.code;
        this.updateValue();
      },
    },

    phoneNumber: {
      get() {
        return formatNumber(this.rules.mask, this.number);
      },

      set(newVal) {
        const number = getPlainPhoneNumber(newVal);
        this.number =
          number.length > this.maxLength ? number.substring(0, this.maxLength) : number;
        this.updateValue();
      },
    },

    phoneCode() {
      return ['+', this.code].join('');
    },

    longPhoneNumber() {
      return [this.code, this.number].join('');
    },

    maxLength() {
      return this.rules ? this.rules.mask.split('#').length - 1 : 11;
    },
  },

  methods: {
    init() {
      this.findRules();

      this.code = this.rules.code;
      this.number = '';

      this.extractNumberParts();
    },

    focusOnInput() {
      this.$nextTick(() => this.$refs.number.focus());
    },

    toggleDropdown() {
      if (this.disabled) return;
      this.opened = !this.opened;
      this.focus = this.opened;
    },

    selectCountryCode(countryCode) {
      this.selectedCountry = countryCode.id;
      this.toggleDropdown();
      this.focusOnInput();
    },

    countryIconUrl(icon) {
      return `https://d1uw69x4c2zrim.cloudfront.net/img/flag_icons/${icon}.svg`;
    },

    findRules() {
      this.rules = findCountryRulesByNumber(this.value) || defaultPhoneCountryRules;
    },

    extractNumberParts() {
      if (this.value) {
        const parts = extractNumberParts(this.value);
        this.code = parts.code;
        this.number = parts.number;
      }
    },

    onFocus() {
      this.opened = false;
      this.focus = true;
    },

    onBlur() {
      this.opened = false;
      this.focus = false;
    },

    onKeyDown(e) {
      const isValidControl = this.isValidControl(e);
      const isValidInput = this.isValidInputChar(e) && this.isValidLength();

      if (isValidControl || isValidInput) return true;

      e.preventDefault();
      e.stopPropagation();
    },

    onKeyUp(e) {
      if (e.keyCode === 13) return this.$emit('keyup', e); // proxy enter key pressed event
      if (e.keyCode === 46) this.phoneNumber = ''; // clear on delete
    },

    updateValue() {
      this.$emit('input', this.longPhoneNumber);
    },

    isValidInputChar(e) {
      return /\d/.test(e.key); // 0..9
    },

    isValidLength() {
      return this.number.length < this.maxLength;
    },

    isValidControl(e) {
      if (e.keyCode === 8) return true; // backspace
      if (e.keyCode === 46) return true; // delete
      if (e.ctrlKey && e.keyCode === 64) return true; // ctrl+c
      if (e.ctrlKey && e.keyCode === 65) return true; // ctrl+a
      if (e.ctrlKey && e.keyCode === 88) return true; // ctrl+x
      return false;
    },

    setSelectType(windowWidth) {
      this.nativeSelect = windowWidth <= 768;
    },

    onWindowResize(e) {
      this.setSelectType(e.target.innerWidth);
    },
  },

  created() {
    this.init();
  },

  mounted() {
    this.setSelectType(window.innerWidth);
    window.addEventListener('resize', this.onWindowResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.onWindowResize);
  },
};

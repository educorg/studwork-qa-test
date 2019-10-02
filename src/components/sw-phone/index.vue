<template>
  <div
    class="sw-phone"
    :class="{ focus, opened, disabled, expanded }"
  >
    <div
      class="sw-phone-country"
      v-click-outside="onBlur"
      @click="toggleDropdown"
    >
      <span class="sw-phone-country__flag">
        <img
          v-if="rules.icon"
          :src="countryIconUrl(rules.icon)"
          class="present"
        />

        <span
          v-else
          class="empty"
        >
          ?
        </span>
      </span>

      <span class="fa fa-angle-down sw-phone-country__dropdown-icon" />

      <select
        v-model="selectedCountry"
        v-if="nativeSelect"
        :disabled="disabled"
        tabindex="-1"
        class="sw-phone-country__native"
        :class="{ 'sw-phone-country__native_active': nativeSelect }"
        @focus.stop="onFocus"
        @blur.stop="onBlur"
      >
        <option
          v-for="countryCode in countryCodes"
          :key="countryCode.id"
          :value="countryCode.id"
        >
          +{{ countryCode.code ? countryCode.code + ':' : '' }}
          {{ countryCode.title }}
        </option>
      </select>

      <div
        v-else
        v-show="opened"
        class="sw-phone-country__dropdown"
      >
        <div
          v-for="countryCode in countryCodes"
          :key="countryCode.id"
          class="sw-phone-country__dropdown-item"
          :class="{ active: countryCode.id === selectedCountry }"
          @click.stop="selectCountryCode(countryCode)"
        >
          <span class="sw-phone-country__flag">
            <img
              v-if="countryCode.icon"
              :src="countryIconUrl(countryCode.icon)"
              class="present"
            />

            <span
              v-else
              class="empty"
            >
              ?
            </span>
          </span>

          <span class="sw-phone-country__code">+{{ countryCode.code }}</span>

          <span class="sw-phone-country__title">{{ countryCode.title }}</span>
        </div>
      </div>
    </div>

    <div class="sw-phone-country-code">{{ phoneCode }}</div>

    <div class="sw-phone-number">
      <input
        v-model="phoneNumber"
        ref="number"
        :disabled="disabled"
        placeholder="Номер телефона"
        type="text"
        class="sw-phone-number__input"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
        @blur.stop="onBlur"
        @focus.stop="onFocus"
        @paste.stop.prevent
      >
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>

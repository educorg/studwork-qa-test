import Vue from 'vue';

import phoneNumber from './phoneNumber';
import spaceNumber from './spaceNumber';

Vue.filter('phoneNumber', phoneNumber);
Vue.filter('spaceNumber', spaceNumber);

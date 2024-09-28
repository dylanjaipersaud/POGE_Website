/* eslint-disable no-undef */
import { mount, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import LoginView from '@/components/LoginView.vue';

const vuetify = createVuetify({
    components,
    directives,
  })

describe('LoginComponent.vue', () => {
    let store;

    beforeEach(() => {
        store = createStore({
            state: {
                role: 0,
                user: null,
                login_items: [
                    { id: 7007847, email: 'reshmac001@gmail.com' },
                    { id: 6590559, email: 'mako1902@ymail.com' },
                    { id: 8422, email: 'mjersey@poge.com' },
                    { id: 1092, email: 'goodneighbor@poge.com' },
                ],
                team_items: [
                    { team_name: '4K', budget: 440000, manager: 5444 },
                    { team_name: 'ActiSight', budget: 550000, manager: 6924 },
                    { team_name: 'LowRez', budget: 180000, manager: 8422 },
                ],
                employee_items:[
                    { id: 8422, email: 'mjersey@poge.com' },
                    { id: 1092, email: 'goodneighbor@poge.com' },
                ],
                customer_items: [
                    { id: 7007847, email: 'reshmac001@gmail.com' },
                    { id: 6590559, email: 'mako1902@ymail.com' },
                ],
            },

            getters: {
                role: state => state.role,
                user: state => state.user,
                login_items: state => state.login_items,
                team_items: state => state.team_items,
                customer_items: state => state.customer_items,
                employee_items: state => state.employee_items,
            },

            mutations: {
                update_user(state, newUser) {
                    state.user = newUser;
                },

                update_role(state, newRole) {
                    state.role = newRole;
                },

                get_logins(state) {
                    return state.login_items;
                },

                get_teams(state) {
                    return state.team_items;
                },

                get_employees(state) {
                    return state.employee_items;
                },

                get_customers(state) {
                    return state.customer_items;
                },
                // login: jest.fn((context, payload) => {
                //     state.role = payload.role;
                //     state.user = payload.user;
                // }),
            },

            actions: {
                login({ commit }, newData) {
                    commit('update_user', newData.user)
                    commit('update_role', newData.role)
                },

                logout({ commit }) {
                    commit('update_user', {})
                    commit('update_role', 0)
                },

                getCustomers({ commit }) {
                    commit('get_customers')
                },

                getEmployees({ commit }) {
                    commit('get_employees')
                },

                getLogins({ commit }) {
                    commit('get_logins')
                },

                getTeams({ commit }) {
                    commit('get_teams')
                },

            },
        });
    });

    it('should authenticate mjersey as tech lead (role = 1)', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify] } });


        wrapper.setData({ email: 'mjersey@poge.com', id: 8422 });

        wrapper.vm.accountLookUp();

        expect(store.state.role).toBe(1);
        expect(store.state.user.email).toBe('mjersey@poge.com');
    });

    it('should authenticate goodneighbor as employee (role = 2)', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify] } });


        wrapper.setData({ email: 'goodneighbor@poge.com', id: 1092 });

        wrapper.vm.accountLookUp();

        expect(store.state.role).toBe(2);
        expect(store.state.user.email).toBe('goodneighbor@poge.com');
    });

    it('should authenticate reshmac001 as customer (role = 3)', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify] } });


        wrapper.setData({ email: 'reshmac001@gmail.com', id: 7007847 });

        wrapper.vm.accountLookUp();

        expect(store.state.role).toBe(3);
        expect(store.state.user.email).toBe('reshmac001@gmail.com');
    });

    it('should set invalidAuth to true on failed authentication', () => {
        const wrapper = mount(LoginView, { global: { plugins: [store, vuetify] } });

        wrapper.setData({ email: 'invalid@poge.com', id: 123456 });

        wrapper.vm.accountLookUp();

        expect(wrapper.vm.invalidAuth).toBe(true);
    });
});

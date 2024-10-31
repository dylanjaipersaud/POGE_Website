/* eslint-disable no-undef */
import { mount, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import LoginView from '@/components/LoginView.vue';
import EmployeeAccView from '@/components/EmployeeAccView.vue';
import LeadAccView from '@/components/LeadAccView.vue';
import CustomerAccView from '@/components/CustomerAccView.vue';

import { createRouter, createWebHistory } from 'vue-router'
//set up vuetify for testing component
const vuetify = createVuetify({
    components,
    directives,
})
//create a vue router for testing
const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        // { path: '/', component: App },
        { path: '/', name: LoginView, component: LoginView },
        { path: '/EmployeeAccView', name: EmployeeAccView, component: EmployeeAccView },
        { path: '/LeadAccView', name: LeadAccView, component: LeadAccView },
        { path: '/CustomerAccView', name: CustomerAccView, component: CustomerAccView },
      ]
  })

describe('LoginComponent.vue', () => {
    let store;

   //function runs before each test to refresh the setup of the store
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
                employee_items: [
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
   

    //  Testing accountLookUp function,
    //Test that 'mjersey' authenticates as a tech lead.
    it('should authenticate mjersey as tech lead (role = 1)', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify, router] } });

        wrapper.setData({ email: 'mjersey@poge.com', id: 8422 });
        wrapper.vm.accountLookUp();

        expect(store.state.role).toBe(1);
        expect(store.state.user.email).toBe('mjersey@poge.com');
    });
    //tests that goodneight as an employee
    it('should authenticate goodneighbor as employee (role = 2)', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify, router] } });
    
        wrapper.setData({ email: 'goodneighbor@poge.com', id: 1092 });
        wrapper.vm.accountLookUp();
    
        expect(store.state.role).toBe(2);
        expect(store.state.user.email).toBe('goodneighbor@poge.com');
        //checks if true
    });
    //same process but for customer
    it('should authenticate reshmac001 as customer (role = 3)', () => {
        const wrapper = mount(LoginView, { global: { plugins: [store, vuetify, router] } });

        wrapper.setData({ email: 'reshmac001@gmail.com', id: 7007847 });
        wrapper.vm.accountLookUp();

        expect(store.state.role).toBe(3);
        expect(store.state.user.email).toBe('reshmac001@gmail.com');
    });
    //edge case in case of failed authentication
    it('should set invalidAuth to true on failed authentication', () => {
        const wrapper = mount(LoginView, { global: { plugins: [store, vuetify, router]  } });

        wrapper.setData({ email: 'invalid@poge.com', id: 123456 });
        wrapper.vm.accountLookUp();

        expect(wrapper.vm.invalidAuth).toBe(true);
    });



    //Testing getUserRole function
    //similar to last test but we make sure that the role number is set
    it('should set role to 3 for a customer', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify, router] } });

        wrapper.setData({ email: 'reshmac001@gmail.com', id: 7007847 });
        wrapper.vm.getUserRole();

        expect(store.state.role).toBe(3);
        expect(store.state.user.email).toBe('reshmac001@gmail.com');
    });

    it('should set role to 2 for a regular employee', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify, router] } });

        wrapper.setData({ email: 'goodneighbor@poge.com', id: 1092 });
        wrapper.vm.getUserRole();

        expect(store.state.role).toBe(2);
        expect(store.state.user.email).toBe('goodneighbor@poge.com');
    });

    it('should set role to 1 for a tech lead', () => {
        const wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify, router] } });

        wrapper.setData({ email: 'mjersey@poge.com', id: 8422 });
        wrapper.vm.getUserRole();

        expect(store.state.role).toBe(1);
        expect(store.state.user.email).toBe('mjersey@poge.com');
    });
    //all of this seems redundant but creating the setup
    //store creationg ,test cases, and mocking is ensuring functionality,
    // improving code quality, and saves time from issues later in the future



    
    // describe('getUserRole', () => {
    //     let wrapper;

    //     beforeEach(() => {
    //         wrapper = shallowMount(LoginView, { global: { plugins: [store, vuetify] } });
    //     });

    // it('should not set a valid role for an unknown user', () => {
    // wrapper.setData({ email: 'unknown@poge.com', id: 9999 });
    // wrapper.vm.getUserRole();

    // expect(store.state.role).toBe(0); // Assuming 0 is the default role
    // expect(wrapper.vm.invalidAuth).toBe(true);
    // });

    //tried to add this test but the id isnt recognized for obvious reasons
    // });

});

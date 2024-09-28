/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import LoginComponent from '@/components/Login.vue';  
import Vuex from 'vuex';

describe('LoginComponent.vue', () => {
  let store;
  let state;
  let getters;

  beforeEach(() => {
    state = {
      role: 0,
      user: null,
    };

    getters = {
      login_items: () => [
        { id: 7007847, email: 'reshmac001@gmail.com' },
        { id: 6590559, email: 'mako1902@ymail.com' },
        { id: 8422, email: 'mjersey@poge.com' },
        { id: 1092, email: 'goodneighbor@poge.com' },
      ],
      team_items: () => [
        { team_name: '4K', budget: 440000, manager: 5444 },
        { team_name: 'ActiSight', budget: 550000, manager: 6924 },
        { team_name: 'LowRez', budget: 180000, manager: 8422 },
      ],
      employee_items: () => [
        { id: 8422, email: 'mjersey@poge.com' },
        { id: 1092, email: 'goodneighbor@poge.com' },
      ],
      customer_items: () => [],
    };

    store = new Vuex.Store({
      state,
      getters,
      actions: {
        getLogins: jest.fn(),
        getTeams: jest.fn(),
        getEmployees: jest.fn(),
        getCustomers: jest.fn(),
        login: jest.fn((context, payload) => {
          state.role = payload.role;
          state.user = payload.user;
        }),
      },
    });
  });

  it('should authenticate mjersey as tech lead (role = 1)', async () => {
    const wrapper = shallowMount(LoginComponent, { store });
    
     
    wrapper.setData({ email: 'mjersey@poge.com', id: 8422 });
    
    await wrapper.vm.accountLookUp();
    
    expect(store.state.role).toBe(1);
    expect(store.state.user.email).toBe('mjersey@poge.com');
  });

  it('should authenticate goodneighbor as employee (role = 2)', async () => {
    const wrapper = shallowMount(LoginComponent, { store });
    
     
    wrapper.setData({ email: 'goodneighbor@poge.com', id: 1092 });
    
    await wrapper.vm.accountLookUp();
    
    expect(store.state.role).toBe(2);
    expect(store.state.user.email).toBe('goodneighbor@poge.com');
  });

  it('should authenticate reshmac001 as customer (role = 3)', async () => {
    const wrapper = shallowMount(LoginComponent, { store });
    
     
    wrapper.setData({ email: 'reshmac001@gmail.com', id: 7007847 });
    
    await wrapper.vm.accountLookUp();
    
    expect(store.state.role).toBe(3);
    expect(store.state.user).toBeNull();  
  });

  it('should set invalidAuth to true on failed authentication', async () => {
    const wrapper = shallowMount(LoginComponent, { store });
    
     
    wrapper.setData({ email: 'invalid@poge.com', id: 123456 });
    
    await wrapper.vm.accountLookUp();
    
    expect(wrapper.vm.invalidAuth).toBe(true);
  });
});

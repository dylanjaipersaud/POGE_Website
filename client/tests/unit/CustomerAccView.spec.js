/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import CustomerView from '@/components/CustomerAccView.vue'; 
import axios from 'axios';
jest.mock('axios');

describe('CustomerView.vue', () => {
  let store;
  let actions;
  let state;
  let wrapper;  
  beforeEach(() => {
    global.confirm = jest.fn(() => true);
    
    state = {
      user: {
        email: 'test@example.com',
        id: 1,
        account_name: 'Test Account',
        first_name: 'Test',
        last_name: 'User',
      },
      purchase_items: [
        { invoice: 1, game: 'Game A', store: 'Store A', account: 'Test Account' },
        { invoice: 2, game: 'Game B', store: 'Store B', account: 'Another Account' },
      ],
    };

    actions = {
      getPurchases: jest.fn().mockResolvedValue([]),
      logout: jest.fn().mockResolvedValue(),
      clearCart: jest.fn().mockResolvedValue(),
    };

    store = createStore({
      state,
      actions,
      mutations: {
        update_user: (state, newUser) => {
          state.user = { ...state.user, ...newUser };
        },
      },
    });

    
    wrapper = shallowMount(CustomerView, { global: { plugins: [store] } });
  });

  it('should alert on update failure', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    axios.put.mockRejectedValue(new Error('Error')); 

    await wrapper.vm.handleUpdate(); 
    
    expect(alertSpy).toHaveBeenCalledWith("An error has occurred");
    alertSpy.mockRestore();    });


  it('should correctly toggle edit mode', () => {
    const wrapper = shallowMount(CustomerView, { global: { plugins: [store] } });
    expect(wrapper.vm.editMode).toBe(false);
    wrapper.vm.editUser();
    expect(wrapper.vm.editMode).toBe(true);
  });

  it('should get purchases for the logged-in user', () => {
    const wrapper = shallowMount(CustomerView, { global: { plugins: [store] } });
    const purchases = wrapper.vm.getPurchases();
    
    expect(purchases).toEqual([{ invoice: 1, game: 'Game A', store: 'Store A', account: 'Test Account' }]);
  });

  it('should handle user update successfully', async () => {
    const wrapper = shallowMount(CustomerView, { global: { plugins: [store] } });
    wrapper.vm.newUserData = { 
      email: 'newemail@example.com', 
      id: 1, 
      account_name: 'New Account', 
      first_name: 'New', 
      last_name: 'User' 
    };
    
    axios.put.mockResolvedValue({ data: { success: true } });

    await wrapper.vm.handleUpdate();

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3030/Customers', null, {
      params: wrapper.vm.newUserData,
    });
    expect(store.state.user).toEqual(wrapper.vm.newUserData);
  });
  it('should log out the user', async () => {
    const mockPush = jest.fn();  
    const mockRouter = { push: mockPush };     
    const wrapper = shallowMount(CustomerView, { 
      global: { 
        plugins: [store], 
        mocks: { $router: mockRouter }         } 
    });
    
    await wrapper.vm.logoutUser();      
    expect(actions.logout).toHaveBeenCalled();      
    expect(mockPush).toHaveBeenCalledWith('/LoginView');
  });
});  

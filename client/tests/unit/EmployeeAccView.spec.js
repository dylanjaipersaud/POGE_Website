/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import EmployeeAcc from '@/components/EmployeeAccView.vue';
import axios from 'axios';
jest.mock('axios');

describe('EmployeeAcc.vue', () => {
  let store;
  let state;
  let actions;
  let wrapper;

  beforeEach(() => {
    global.confirm = jest.fn(() => true); // Mock global confirm

    state = {
      user: {
        email: 'employee@example.com',
        id: 1,
        first_name: 'Employee',
        last_name: 'User',
        role: 'Developer',
        team_name: 'Engineering',
        phone: '1234567890',
      },
      update_items: []
    };

    actions = {
      logout: jest.fn().mockResolvedValue(),
      getTeams: jest.fn(),
      getDevelopments: jest.fn(),
      getEmployees: jest.fn(),
      getUpdates: jest.fn(),
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

    wrapper = shallowMount(EmployeeAcc, {
      global: {
        plugins: [store],
      },
    });
  });

  it('should toggle edit mode', () => {
    expect(wrapper.vm.editMode).toBe(false); // Initially false
    wrapper.vm.editUser(); // Call editUser to toggle
    expect(wrapper.vm.editMode).toBe(true); // Should be true now
  });

  it('should update user data successfully', async () => {
    // Prepare mock data
    const newUserData = {
      email: 'newemail@example.com',
      id: 1,
      first_name: 'New',
      last_name: 'User',
      role: 'Manager',
      team_name: 'Team',
      phone: '1234567890',
    };
    
    wrapper.vm.newUserData = newUserData; // Set new data

    // Mock axios response
    axios.put.mockResolvedValue({ data: { success: true } });

    await wrapper.vm.updateUser(); // Call updateUser

    expect(axios.put).toHaveBeenCalled(); // Check axios call
    expect(store.state.user).toEqual(newUserData); // Check updated user data
  });

  it('should log out the user', async () => {
    const mockPush = jest.fn();
    const mockRouter = { push: mockPush };

    // Re-mount the component to ensure the router mock is used
    wrapper = shallowMount(EmployeeAcc, {
      global: {
        plugins: [store],
        mocks: { $router: mockRouter },
      },
    });

    await wrapper.vm.logoutUser(); // Call logoutUser

    expect(actions.logout).toHaveBeenCalled(); // Check if logout was called
    expect(actions.logout).toHaveBeenCalled(); // Check if logout was called
    expect(mockPush).toHaveBeenCalledWith('/LoginView'); // Check redirection
  });
});

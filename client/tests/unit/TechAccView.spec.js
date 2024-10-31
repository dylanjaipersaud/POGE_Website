import { shallowMount } from '@vue/test-utils';
import TechLeadAccount from '@/components/LeadAccView.vue'; 
import { createStore } from 'vuex';
import axios from 'axios';
jest.mock('axios');
//testing to ensure the component and its functions behaves and works as expected
describe('TechLeadAccount.vue', () => {
  let store;
  let state;
  let actions;
  let wrapper;
    //initalize state with mock data
  beforeEach(() => {
    state = {
      user: {
        email: 'lead@example.com',
        id: 1,
        first_name: 'Tech',
        last_name: 'Lead',
        team_name: 'Engineering',
        role: 'Tech Lead',
        phone: '1234567890',
      },
      team_items: [],
      employee_items: [
            { id: 1, team_name: 'Engineering', first_name: 'Alice', last_name: 'Smith' },
            { id: 2, team_name: 'Marketing', first_name: 'Bob', last_name: 'Johnson' },
          ],
          
    
      game_items: [],
    };
    //mock actions from vuex store
    actions = {
      logout: jest.fn().mockResolvedValue(),
      getTeams: jest.fn().mockResolvedValue(),
      getEmployees: jest.fn().mockResolvedValue(),
      getGames: jest.fn().mockResolvedValue(),
      update_user: jest.fn(),
    };
    //recreate vuex store, in order to interact with the store just like in a real app
    store = createStore({
      state,
      actions,
      getters: { 
        employee_items: (state) => state.employee_items,    
      },
    });
    //mount component with vuex
    wrapper = shallowMount(TechLeadAccount, {
      global: {
        plugins: [store],
      },
    });
  });
  
  it('should toggle edit mode', async () => {
    wrapper.vm.editMode = false;  
    axios.put.mockResolvedValue({ data: { success: true } });  

    await wrapper.vm.updateUser();  

    expect(wrapper.vm.editMode).toBe(true);
  });
//test case to verify user logout functionality
  it('should log out the user', async () => {
    const mockRouter = { push: jest.fn() };
    window.confirm = jest.fn().mockReturnValue(true);  
    wrapper = shallowMount(TechLeadAccount, {
      global: {
        plugins: [store],
        mocks: { $router: mockRouter },
      },
    });
// call logout user, check logout was called
    await wrapper.vm.logoutUser();
    expect(actions.logout).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/LoginView'); //navigate back to login view 
  });
//test case to verify that user data will update
  it('should update user data successfully', async () => {
    const newUserData = {
      email: 'newemail@example.com',
      id: 1,
      first_name: 'New',
      last_name: 'User',
      phone: '0987654321',
      role: 'Senior Tech Lead',
      team_name: 'Engineering',
    };

     
    wrapper.vm.editMode = true;
    wrapper.vm.newUserData = newUserData;

     
    axios.put.mockResolvedValue({ data: { success: true } });

     
    await wrapper.vm.updateUser();  

    // Assertions to verify the PUT request was made with the correct parameter
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:3030/Employees',
      null,
      { params: newUserData }
    );

    expect(actions.update_user).toHaveBeenCalledWith(expect.anything(), newUserData);
  });
 // Test case to verify retrieving employees by team
 it('should return employees for the specified team', () => {
  const employees = wrapper.vm.getEmployees('Engineering');
  expect(employees).toEqual([{ id: 1, team_name: 'Engineering', first_name: 'Alice', last_name: 'Smith' }]);
});

//test case to verify format dates are correct for managing game releases
  it('should format date correctly', () => {
    const formattedDate = wrapper.vm.formatDate('2024-10-31');
    expect(formattedDate).toBe('10-31-2024');
  });
//constant process of failing and succedding between tests,
//used a concept of TDD, but didnt write the tests first but each test would go 
//from red and would reach green which is obvioulsy success, and would refactor
});

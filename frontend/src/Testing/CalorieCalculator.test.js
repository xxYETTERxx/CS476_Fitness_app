/*
    Test description: 
    Two tests where we import the 'getMETValue' function from 'CalorieCalculator'.

    In the first test e are testing an a few different exercises and their expected MET values. 
    we iterate over each test case calling the 'GetMETValue' function and asserting that the returned
    MET value matches the expected value.

    In the second case we are testing for possible errors in the exercises where an unknown may be returned. 
    So in this case we call the function with an unknown exercise and assert that it return a default value which
    in our case should be 1.

    In the second set of tests the first test should check to see if the header text is being rendered and the next
    few tests all do similar things testing to see if the input boxes and their labels are rendered as well as the button.

    * Not sure on the value of the second test at this point since the default value was something a came up with 
    in an earlier version of the module where I had us manually entering the MET value and it was added as a failsafe
    in case a MET wasnt entered.*

    ** To run the test use the Jest test runner by running 'npm test' if using i guess we should add jest to tech used. **
    *** Add Jest and React Testing library to help create these tests
*/
import React from 'react';
import { getMETValue } from '../components/CalorieCalculator.jsx'; 
import { render, screen } from '@testing-library/react';
import CalorieCalculator from './CalorieCalculator';

// First two tests
describe('getMETValue', () => {
  it('Should return the MET value for a given exercise', () => {
    
    const testCases = [
      { exercise: 'walking', expectedMET: 3.5 },
      { exercise: 'running', expectedMET: 7 },
      { exercise: 'pilates', expectedMET: 3.8 },
      { exercise: 'sprinting', expectedMET: 9 },
      { exercise: 'sleeping', expectedMET: 0.9 },
      // We can add more tests here too
    ];

    // Iterate over test cases
    testCases.forEach(({ exercise, expectedMET }) => {
      // Call the function with the chosen exercise
      const metValue = getMETValue(exercise);

      // Check that expected MET value matched the value obtained
      expect(metValue).toBe(expectedMET);
    });
  });

  it('Should return a default MET value of "1" if the exercise is not found', () => {
    // Call the function with an unknown exercise
    const metValue = getMETValue('unknown');

    // Assert that the returned MET value is the default value
    expect(metValue).toBe(1); 
  });
});

// Second set of tests 
test('renders CalorieCalculator component', () => {
    // Render the CalorieCalculator component
    render(<CalorieCalculator />);
  
    // Verify that the header text "Calorie Calculator" is rendered
    const headerElement = screen.getByText(/Calorie Calculator/i);
    expect(headerElement).toBeInTheDocument();
  
    // Verifies that the input fields and buttons get rendered
    const weightInput = screen.getByLabelText(/Current Weight:/i);
    expect(weightInput).toBeInTheDocument();
  
    const exerciseTypeSelect = screen.getByLabelText(/Exercise Type:/i);
    expect(exerciseTypeSelect).toBeInTheDocument();
    
    const durationInput = screen.getByLabelText(/Duration \(minutes\):/i);
    expect(durationInput).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: /Add Exercise/i });
    expect(addButton).toBeInTheDocument();
  });
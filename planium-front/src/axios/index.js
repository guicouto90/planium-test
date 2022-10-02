import axios from "axios";

const url = 'http://localhost:3001/plans';

// NEW REGISTER
const postRegister = async(beneficiariesData, chosenPlan) => {
  try {
    const response = await axios.post(`${url}/beneficiaries`, {
      beneficiariesData, chosenPlan
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

// GET ALL REGISTERS
const getRegisters = async() => {
  try {
    const { data } = await axios.get(`${url}/proposal`);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export {
  postRegister,
  getRegisters,
}
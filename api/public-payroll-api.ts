import axios from "axios";
import { getApiBaseUrl } from "../config/config.service";

export const getAgenciesByName = async (agency?: string) => {
  let url = `${getApiBaseUrl()}/agencies`;
  if (agency) {
    url += `name=${agency}`;
  }
  const { data: agencies } = await axios.get(url);
  return agencies;
};

export const getTopEarnersByDepartment = async (department?: string) => {
  let url = `${getApiBaseUrl()}/employees/top-earners`;
  if (department) {
    url += `agency=${department}`;
  }
  const { data: employees } = await axios.get(url);
  return employees;
};

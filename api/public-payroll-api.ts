import axios from "axios";
import { getApiBaseUrl } from "../config/config.service";
import { getAgencyNameWithoutNumber } from "../utils/agency-utils";

export const getAgenciesByName = async (agency?: string) => {
  let url = `${getApiBaseUrl()}/agencies`;
  if (agency) {
    url += `?name=${agency}`;
  }
  const { data: agencies } = await axios.get(url);
  return agencies.map(cleanAgencyName);
};

export const getAgencyById = async (agencyId: string) => {
  const { data: agency } = await axios.get(
    `${getApiBaseUrl()}/agencies/${agencyId}`
  );
  return cleanAgencyName(agency);
};

const cleanAgencyName = (agency) => ({
  ...agency,
  name: getAgencyNameWithoutNumber(agency.name),
});

export const getTopEarnersByDepartment = async (department?: string) => {
  let url = `${getApiBaseUrl()}/employees/top-earners`;
  if (department) {
    url += `?agency=${department}`;
  }
  const { data: employees } = await axios.get(url);
  return employees.map(cleanEmployeeAgency);
};

export const getAllEarnersByDepartment = async (department?: string) => {
  let url = `${getApiBaseUrl()}/employees/top-earners`;
  if (department) {
    url += `?agency=${department}&limit=0`;
  }
  const { data: employees } = await axios.get(url);
  return employees.map(cleanEmployeeAgency);
};

export const getEarnerById = async (earnerId: string) => {
  let url = `${getApiBaseUrl()}/employees/${earnerId}`;
  const { data: employee } = await axios.get(url);
  return cleanEmployeeAgency(employee);
};

export const getEmployeesByName = async (employee?: string) => {
  let url = `${getApiBaseUrl()}/employees`;
  if (employee) {
    url += `?name=${employee}`;
  }
  const { data: employees } = await axios.get(url);
  return employees.map(cleanEmployeeAgency);
};

const cleanEmployeeAgency = (employee) => ({
  ...employee,
  agency: getAgencyNameWithoutNumber(employee.agency),
});

import React, { createContext, useContext, useState } from "react";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [admissions, setAdmissions] = useState([]);
  const [discharges, setDischarges] = useState([]);

  const addAdmission = (patient) => {
    setAdmissions([...admissions, { ...patient, id: Date.now() }]);
  };

  const dischargePatient = (id, summary, bill) => {
    const patient = admissions.find((p) => p.id === Number(id));

    if (!patient) return;

    const dischargedPatient = {
      ...patient,
      dischargeSummary: summary,
      billAmount: bill,
      dischargeDate: new Date().toISOString().split("T")[0],
    };

    setDischarges([...discharges, dischargedPatient]);
    setAdmissions(admissions.filter((p) => p.id !== Number(id)));
  };

  return (
    <HospitalContext.Provider
      value={{ admissions, discharges, addAdmission, dischargePatient }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import API from "../api";
import profileImage from "../assets/profile.png";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      const res = await API.get("/doctors");

      const selectedDoctor = res.data.find(
        (d) => d.id === Number(id)
      );

      setDoctor(selectedDoctor);
    } catch (err) {
      console.log(err);
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl">Loading Doctor...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8">

        <img
          src={profileImage}
          alt="Doctor"
          className="w-32 h-32 rounded-full"
        />

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-teal-600">
            {doctor.doctor_name}
          </h1>

          <p className="text-lg text-gray-600">
            {doctor.specialization}
          </p>

          <p className="mt-2">
            Experience: {doctor.experience}
          </p>

          <p className="mt-2">
            Qualification: {doctor.qualification}
          </p>

          <p className="mt-2">
            Phone: {doctor.phone}
          </p>

          <p className="mt-2">
            Email: {doctor.email}
          </p>

          <div className="mt-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {doctor.availability}
            </span>
          </div>

          <div className="flex mt-4">
            {[1,2,3,4,5].map((i)=>(
              <Star key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />
            ))}
          </div>

          <button
            onClick={() =>
              navigate(`/appointments/book/${doctor.id}`)
            }
            className="mt-6 bg-teal-600 text-white px-6 py-3 rounded"
          >
            Book Appointment
          </button>

        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
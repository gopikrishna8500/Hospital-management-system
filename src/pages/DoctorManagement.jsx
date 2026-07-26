import React,{useEffect,useState} from "react";
import API from "../api";


const DoctorManagement=()=>{


const [departments,setDepartments]=useState([]);

const [doctors,setDoctors]=useState([]);



const [doctor,setDoctor]=useState({

doctor_name:"",
specialization:"",
department_id:"",
qualification:"",
experience:"",
phone:"",
email:""

});





useEffect(()=>{

loadDepartments();

loadDoctors();


},[]);





const loadDepartments=async()=>{

const res=await API.get("/departments");

setDepartments(res.data.data);

};




const loadDoctors=async()=>{

const res=await API.get("/doctors");

setDoctors(res.data.data);

};





const handleChange=(e)=>{


setDoctor({

...doctor,

[e.target.name]:e.target.value


});


};





const addDoctor=async()=>{


try{


await API.post("/doctors",doctor);


loadDoctors();



setDoctor({

doctor_name:"",
specialization:"",
department_id:"",
qualification:"",
experience:"",
phone:"",
email:""

});


}catch(error){

console.log(error);

}


};





const deleteDoctor=async(id)=>{


await API.delete(`/doctors/${id}`);

loadDoctors();


};





return(


<div className="min-h-screen bg-gray-100 p-8">


<div className="bg-white p-8 rounded-xl shadow">


<h1 className="text-3xl font-bold text-teal-700 mb-8">

Doctor Management

</h1>



<div className="grid md:grid-cols-4 gap-4">


<input

name="doctor_name"

placeholder="Doctor Name"

value={doctor.doctor_name}

onChange={handleChange}

className="border p-3"

/>



<input

name="specialization"

placeholder="Specialization"

value={doctor.specialization}

onChange={handleChange}

className="border p-3"

/>




<select

name="department_id"

value={doctor.department_id}

onChange={handleChange}

className="border p-3"

>


<option>
Select Department
</option>


{

departments.map(d=>(

<option key={d.id} value={d.id}>

{d.department_name}

</option>

))

}


</select>



<input

name="experience"

placeholder="Experience"

value={doctor.experience}

onChange={handleChange}

className="border p-3"

/>


</div>




<button

onClick={addDoctor}

className="bg-teal-600 text-white px-6 py-3 mt-6 rounded"

>

Add Doctor

</button>






<table className="w-full mt-8">


<thead>


<tr className="bg-teal-600 text-white">

<th>Name</th>

<th>Department</th>

<th>Specialization</th>

<th>Action</th>


</tr>


</thead>


<tbody>


{

doctors.map(doc=>(


<tr key={doc.id} className="border text-center">


<td>

{doc.doctor_name}

</td>


<td>

{doc.department_name}

</td>


<td>

{doc.specialization}

</td>


<td>


<button

onClick={()=>deleteDoctor(doc.id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>


</td>


</tr>


))


}


</tbody>



</table>



</div>


</div>


)

}


export default DoctorManagement;
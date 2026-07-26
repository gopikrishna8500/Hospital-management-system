import React, {useEffect,useState} from "react";
import API from "../api";


const DepartmentManagement =()=>{


const [department,setDepartment]=useState("");

const [departments,setDepartments]=useState([]);



/* GET DEPARTMENTS */

const fetchDepartments=async()=>{

try{

const res=await API.get("/departments");

setDepartments(res.data.data);


}catch(error){

console.log(error);

}

};



useEffect(()=>{

fetchDepartments();

},[]);





/* ADD DEPARTMENT */

const addDepartment=async()=>{


if(!department.trim()){

alert("Enter Department Name");
return;

}


try{


await API.post("/departments",{

department_name:department,
department_head:"",
description:""


});


setDepartment("");

fetchDepartments();


}catch(error){

console.log(error);

}


};





/* DELETE */

const deleteDepartment=async(id)=>{


try{

await API.delete(`/departments/${id}`);

fetchDepartments();


}catch(error){

console.log(error);

}


};




return(

<div className="min-h-screen bg-gray-100 p-8">


<div className="bg-white rounded-xl shadow-lg p-8">


<h1 className="text-3xl font-bold text-teal-700 mb-8">

Department Management

</h1>



<div className="flex gap-4 mb-8">


<input

placeholder="Department Name"

value={department}

onChange={(e)=>setDepartment(e.target.value)}

className="border p-3 rounded-lg w-full"

/>


<button

onClick={addDepartment}

className="bg-teal-600 text-white px-6 rounded-lg"

>

Add

</button>


</div>




<table className="w-full">


<thead>

<tr className="bg-teal-600 text-white">

<th className="p-3">
Department
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>



<tbody>


{
departments.map((dept)=>(


<tr key={dept.id} className="border-b text-center">


<td className="p-3">

{dept.department_name}

</td>


<td>

{dept.status}

</td>


<td>


<button

onClick={()=>deleteDepartment(dept.id)}

className="bg-red-600 text-white px-4 py-1 rounded"

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


export default DepartmentManagement;
const express=require("express");
const router=express.Router();

const pool=require("../../config/db");


// GET DOCTORS

router.get("/",async(req,res)=>{

try{

const result=await pool.query(
`
SELECT 
doctors.*,
departments.department_name
FROM doctors
LEFT JOIN departments
ON doctors.department_id=departments.id
ORDER BY doctors.id DESC
`
);


res.json({
data:result.rows
});


}catch(error){

console.error(error);

res.status(500).json({
message:"Doctor fetch failed"
});

}

});




// ADD DOCTOR

router.post("/",async(req,res)=>{


try{


const {
doctor_name,
specialization,
department_id,
qualification,
experience,
phone,
email
}=req.body;



const result=await pool.query(
`
INSERT INTO doctors
(
doctor_name,
specialization,
department_id,
qualification,
experience,
phone,
email
)

VALUES($1,$2,$3,$4,$5,$6,$7)

RETURNING *
`,
[
doctor_name,
specialization,
department_id,
qualification,
experience,
phone,
email
]
);


res.json({
message:"Doctor Added",
data:result.rows[0]
});


}catch(error){

console.error(error);

res.status(500).json({
message:"Doctor creation failed"
});

}


});




module.exports=router;
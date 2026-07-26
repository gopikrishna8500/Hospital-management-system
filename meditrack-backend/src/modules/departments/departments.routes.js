const express = require("express");
const router = express.Router();

const pool = require("../../config/db");


// GET ALL DEPARTMENTS
router.get("/", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT * FROM departments ORDER BY id DESC"
        );

        res.json({
            data: result.rows
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Failed to fetch departments"
        });
    }
});



// ADD DEPARTMENT
router.post("/", async(req,res)=>{

    try{

        const {
            department_name,
            department_head,
            description
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO departments
            (
            department_name,
            department_head,
            description
            )
            VALUES($1,$2,$3)
            RETURNING *
            `,
            [
                department_name,
                department_head,
                description
            ]
        );


        res.json({
            message:"Department Added",
            data:result.rows[0]
        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Department creation failed"
        });

    }

});



// UPDATE STATUS
router.put("/:id", async(req,res)=>{

    try{

        const {status}=req.body;

        const result=await pool.query(
            `
            UPDATE departments
            SET status=$1
            WHERE id=$2
            RETURNING *
            `,
            [
                status,
                req.params.id
            ]
        );


        res.json({
            data:result.rows[0]
        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Update failed"
        });
    }

});



// DELETE DEPARTMENT

router.delete("/:id",async(req,res)=>{

try{

await pool.query(
"DELETE FROM departments WHERE id=$1",
[req.params.id]
);


res.json({
message:"Department deleted"
});


}catch(error){

console.error(error);

res.status(500).json({
message:"Delete failed"
});

}


});


module.exports=router;
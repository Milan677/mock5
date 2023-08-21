const express=require("express");
const appointmentRouter=express.Router();

const{appModel}=require("../models/app")

//create an appointment
appointmentRouter.post("/",async(req,res)=>{
    try {
        const data=req.body;
        const newApp=await appModel.create(data);
        res.send("new appointment created")
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//...... get all appointments.......

appointmentRouter.get("/",async(req,res)=>{
    try {
        const data= await appModel.find();
        res.send(data)
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
   
})

//...... edit.......
appointmentRouter.patch("/:id",async(req,res)=>{
    try {
        const data=await appModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.send({"msg":"succesufully updated","data":data})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//........delete...................
appointmentRouter.delete("/:id",async(req,res)=>{
    try {
        const data= await appModel.findByIdAndDelete({_id:req.params.id});
        res.send({"msg":"deleted...","data":data})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//.....serach by name.......

appointmentRouter.get('/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const searchResults = await Appointment.find({ name: { $regex: name, $options: 'i' } });
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
});

module.exports={appointmentRouter}
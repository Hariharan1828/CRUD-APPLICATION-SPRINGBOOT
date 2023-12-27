import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';

export default function Student() {
    const[name,setName] = React.useState("")
    const[dob,setdob] = React.useState("")
    const[email,setEmail] = React.useState("")
    const paperStyle = {padding:"50px 20px", width:600, margin:"20px auto"}
    const[students,setStudents] = React.useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const Student = {name, email,dob}
        console.log(Student)
        fetch("http://localhost:8081/api/v1/student",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(Student)
        }).then(()=>{
            console.log("New User Added")
        })
    }

    React.useEffect(()=>{
      fetch("http://localhost:8081/api/v1/student",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Student)})
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result)
        })
    },[])


    return (
  
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    
      <TextField id="outlined-basic" label="Student Name" variant="outlined"
      value={name}
      onChange={(e)=> setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student email" variant="outlined"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      
      />
      <TextField id="outlined-basic" label="Student Dob" variant="outlined" 
      value={dob}
      onChange={(e)=> setdob(e.target.value)}
      />
    <Button variant="outlined" onClick={handleClick}>submit</Button>
    <Paper style={paperStyle} elevation={8}>
       {students.map(student=>(
          <Paper key={student.id}>
            Id:{student.id}
            Name:{student.name} 
            Email:{student.email} 
            DOB:{student.dob}
            Age:{student.age}
            
          </Paper>

       ))}

    </Paper>
   
    </Box>

 
    

    
    
  );
}

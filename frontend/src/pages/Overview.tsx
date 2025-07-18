import {Divider }from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { IoAddCircleSharp } from "react-icons/io5";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Usernav from '@/components/Usernav';
import { MdOutlineEditNote } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
function Overview() {
  return (
    <div className="w-full ">
      <Usernav/>
      <div className='flex justify-between m-2'>
      <Stack direction="row" spacing={1} >
      <Chip label="All" />
      <Chip label="General" variant="outlined" />
      <Chip label="work" variant="outlined" />
      <Chip label="school" variant="outlined" />
    </Stack>
    <div className='flex text-gray-700'>
    <IoAddCircleSharp size={24} />Add a new note
    </div>
      </div>
      <div>
      <Card sx={{width:"18rem"}}>
      <CardContent>
        <div className='flex justify-between'>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
     General
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
     July 7th 2025
      </Typography> </div>
      <Typography variant="h5" component="div" color="primary">
     Physics 
      </Typography>
      
      <Typography variant="body2">
     Lorem ipsum dolor sit amet consecteolestias repellendus culpa nam praesentium assumenda ea vel cum quam.
        <br />
     
      </Typography>
    </CardContent>
    <CardActions className='flex  flex-col justify-center gap-2'>
    <Divider orientation="horizontal"  sx={{width:"20rem", backgroundColor:"white", height:"0.5px"}}/>
    <div  className='flex  justify-between w-full'>
      <Button size="small">Learn More</Button>
      <div className='flex gap-2'>   <MdOutlineEditNote size={25} color='#3B82F6' />
       <RiChatDeleteLine size={25} color='#3B82F6' />  </div> </div>
    

    </CardActions>
      </Card> </div>
    </div>
  )
}

export default Overview

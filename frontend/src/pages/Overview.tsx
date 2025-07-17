import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
function Overview() {
  return (
    <div className="w-full ">
      <div className="flex justify-between bg-white w-full p-4"><div>
      <div className="flex items-center border-b gap-2 border-gray-500/30 h-[40px] overflow-hidden max-w-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
            </svg>
            <input type="text" placeholder="Find a Note" className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm" />
            <button type="submit" className="bg-blue-500 w-32 h-8 rounded-full text-sm text-white">Search</button>
        </div>
      </div>
      <div className='flex items-center gap-2 text-gray-700'>Hi Frank <Avatar sx={{ bgcolor: "orange" }}>F</Avatar></div></div>
      <Stack direction="row" spacing={1} sx={{margin:"1rem"}}>
      <Chip label="All" />
      <Chip label="General" variant="outlined" />
    </Stack>
    </div>
  )
}

export default Overview

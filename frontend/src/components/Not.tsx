import Chip from '@mui/material/Chip';
import { FaBold } from "react-icons/fa";
import { LiaItalicSolid } from "react-icons/lia";
import { FaUnderline } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphRight } from "react-icons/im";
import { MdOutlineEditNote } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
const Not = () => {
  return (
    <div className=" scroll-auto flex flex-col h-screen w-full p-5">
<div className='flex justify-between mb-6'>
<Chip label="General" /> <div className='flex gap-2'><FaBold /> <LiaItalicSolid /><FaUnderline /> <ImParagraphCenter /> <ImParagraphLeft /> <ImParagraphRight /></div>
<div className='flex gap-2'><MdOutlineEditNote size={25} color='#3B82F6' />
       <RiChatDeleteLine size={25} color='#3B82F6' /></div>
</div>

<input  type="text" disabled value="Physics atomic habits" className='mb-5 text-3xl font-semibold' />
<label htmlFor="synopsis"  className='text-gray-500'>Synopsis:</label>

<textarea name="" disabled className='text-gray-500 mb-5 h-20' id='synopsis'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero atque architecto nobis quibusdam tenetur placeat voluptatem dolorum necessitatibus facere. Quae dicta neque, quis ratione optio nesciunt tempora et esse necessitatibus.</textarea>
<label htmlFor="content"  className='text-gray-900'>Content:</label>
<textarea name="" id="content" className='h-96' disabled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, laborum error? Distinctio est quos nulla consequatur debitis eligendi placeat magni consectetur, dolorum possimus, blanditiis vitae ab deserunt odio molestias tempore.

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae ratione nobis id fugit amet rem, enim quidem voluptatum earum quos alias quam libero excepturi modi pariatur magnam nemo asperiores quisquam.
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores labore at earum sunt minima totam, laborum impedit voluptatem corporis id exercitationem ad culpa ea iure consectetur est architecto repellendus cupiditate!

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quibusdam hic necessitatibus assumenda blanditiis, quia placeat architecto possimus ex perferendis! Qui non illum quod blanditiis ea eius molestiae quas eos.
</textarea>
    </div>
  )
}

export default Not

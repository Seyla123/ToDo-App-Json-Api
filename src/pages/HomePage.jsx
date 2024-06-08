import React from 'react';
import { Button, message } from 'antd';
import TodoApp from './TodoApp';
import { Link } from 'react-router-dom';


const HomePage = () => {
  // Event listener for Button click
  const handleButtonClick = () => {
    message.info('Welcome to Todo App!!!');
    
  };


  return (
    <div className='bg-[#3AA6B9] w-full h-screen flex flex-col items-start justify-center p-8'>
      <h1 className='font-bold text-6xl leading-relaxed text-[#F1F1F1]'>Todo App</h1>
      <div className='flex gap-4'>
      <Link to="/TodoApp">
        <Button type="primary" className='text-[#F1F1F1] bg-[#024591]' onClick={handleButtonClick}>
          Join Now
        </Button>
      </Link>

      </div>
    </div>
  );
};

export default HomePage;
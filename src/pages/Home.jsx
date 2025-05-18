import React from 'react'
import { useAuth } from '../context/auth';

const Home = () => {
  const {auth} = useAuth();
  return (
    <div className="text-4xl font-bold text-center justify-center text-red-500">
      Home
      {auth.user.name}
    </div>
  );
}

export default Home

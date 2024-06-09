import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const result = await response.json();
      if (result.length > 0) {
        login(result[0]);
        message.success('Login successful!');
        navigate('/TodoApp');
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      message.error('Failed to login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <Form onFinish={handleLogin}>
        <Form.Item>
          <Input
            type="email"
            placeholder="Email"
            autoComplete=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            placeholder="Password"
            autoComplete = ""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

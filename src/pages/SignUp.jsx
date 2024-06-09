import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSignup = async () => {
    const newUser = { name, email, password, avatar: 'https://via.placeholder.com/64' };
    try {
      const response = await axios.post('http://localhost:3001/users', newUser);
      if (!response.ok) {
        throw new Error('Failed to signup');
      }
      signup(newUser);
      message.success('Signup successful!');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-5">Signup</h1>
      <Form onFinish={handleSignup}>
        <Form.Item>
          <Input
            placeholder="Name"
            value={name}
            autoComplete=''
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
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
            autoComplete=''
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;

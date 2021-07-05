
import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import TodoList from './TodoList';
import mockData from './mockData';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/todo app/i);
  expect(linkElement).toBeInTheDocument();
});

test('todo list test', () => {
  render(<TodoList items={mockData} />);
  mockData.forEach((item) => expect(screen.getByText(item.text)).toBeInTheDocument());
});
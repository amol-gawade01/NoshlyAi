"use client"
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Calendar, Package, Type } from 'lucide-react';

type Ingredient = {
  id: number;
  name: string;
  expiryDate: string;
  quantity: number;
};

const FoodManagementSystem = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    expiryDate: '',
    quantity: ''
  });

  // Colors for the pie chart
  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (formData.name && formData.expiryDate && formData.quantity) {
      const newIngredient: Ingredient = {
        id: Date.now(),
        name: formData.name,
        expiryDate: formData.expiryDate,
        quantity: parseFloat(formData.quantity) || 0
      };
      console.log('Expiry Date:', typeof(newIngredient.expiryDate));
      setIngredients(prev => [...prev, newIngredient]);
      setFormData({ name: '', expiryDate: '', quantity: '' });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  // Prepare data for pie chart
  const chartData = ingredients.map((ingredient, index) => ({
    name: ingredient.name,
    value: ingredient.quantity,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">Quantity: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Food Item Management System
        </h1>
        <p className="text-gray-600 text-center">
          Track your ingredients and monitor quantities with visual insights
        </p>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side - Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Package className="mr-3 text-blue-600" />
            Add New Ingredient
          </h2>
          
          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredient Name
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter ingredient name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Expiry Date Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Quantity Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter quantity"
                  min="0"
                  step="0.1"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddItem}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium shadow-lg"
            >
              <Plus className="mr-2 w-5 h-5" />
              Add Item
            </button>
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Added Ingredients ({ingredients.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">
                          {ingredient.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Expires: {new Date(ingredient.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-blue-600">
                          {ingredient.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Ingredient Quantity Distribution
          </h2>
          
          {chartData.length > 0 ? (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  No ingredients added yet
                </h3>
                <p className="text-gray-500">
                  Add some ingredients to see the quantity distribution
                </p>
              </div>
            </div>
          )}

          {/* Summary Stats */}
          {ingredients.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {ingredients.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {ingredients.reduce((sum, item) => sum + item.quantity, 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Total Quantity</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodManagementSystem;
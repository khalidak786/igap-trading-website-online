import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
    // State to manage the current page, simulating routing
    const [currentPage, setCurrentPage] = useState('home');
    // State for the search term - No longer directly tied to a search bar on home page,
    // but kept in case search functionality is re-introduced or handled differently.
    const [searchTerm, setSearchTerm] = useState('');

    // SVG for the main banner (abstract representation of global trade/connections)
    const globalTradeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 text-blue-500 mb-6 mx-auto animate-pulse">
        <path fill-rule="evenodd" d="M10.87 8.618A2.25 2.25 0 0112 7.5a2.25 2.25 0 011.13.118l6.195 1.549A2.25 2.25 0 0121 11.25v2.5a2.25 2.25 0 01-1.13 1.983l-6.196 1.549A2.25 2.25 0 0112 16.5a2.25 2.25 0 01-1.13-.118L4.674 14.26A2.25 2.25 0 013 12.75v-2.5a2.25 2.25 0 011.13-1.983l6.196-1.549zM12 9.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zm-3.268 4.29a.75.75 0 00-.75.75V15h.008a.75.75 0 000-1.5H8.732zm6.536 0a.75.75 0 00-.75.75V15h.008a.75.75 0 000-1.5h-.008zM12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" />
    </svg>
    `;

    // Dummy product data - In a real application, this would come from an API or database.
    const productData = {
        'Energy Commodities': [
            { name: 'Crude Oil', description: 'Essential energy source for transportation and industrial processes.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9c0 3.298 1.408 6.273 3.5 8.243l.534.425a1.125 1.125 0 001.442-.423l.256-.513a1.125 1.125 0 00-.423-1.442l-.534-.425c-1.396-1.31-2.203-3.13-2.203-5.088 0-4.004 3.248-7.252 7.252-7.252S19.252 7.996 19.252 12c0 1.958-.807 3.778-2.203 5.088l-.534.425a1.125 1.125 0 00-.423 1.442l.256.513c.231.463.793.617 1.442.423l.534-.425C20.342 17.523 22.5 14.887 22.5 12c0-5.01-4.425-9-9.75-9zm-6 9a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H6zm3 0a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H9zm3 0a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Oil drop
            { name: 'Natural Gas', description: 'Clean-burning fossil fuel, used for electricity and heating.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-500 mx-auto"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v2.25V18a3 3 0 01-3 3H6a3 3 0 01-3-3V8.25V6zm1.5 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zM16.5 9a.75.75 0 00-.75.75v1.5a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75h-1.5z" clip-rule="evenodd" /><path d="M12 11.25a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" /></svg>' }, // Gas tank/molecule
            { name: 'Coal', description: 'Primary energy source for power generation and steelmaking.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-800 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9c0 3.298 1.408 6.273 3.5 8.243l.534.425a1.125 1.125 0 001.442-.423l.256-.513a1.125 1.125 0 00-.423-1.442l-.534-.425c-1.396-1.31-2.203-3.13-2.203-5.088 0-4.004 3.248-7.252 7.252-7.252S19.252 7.996 19.252 12c0 1.958-.807 3.778-2.203 5.088l-.534.425a1.125 1.125 0 00-.423 1.442l.256.513c.231.463.793.617 1.442.423l.534-.425C20.342 17.523 22.5 14.887 22.5 12c0-5.01-4.425-9-9.75-9zM12 11.25a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /><path d="M12 2.25c-5.325 0-9.75 3.99-9.75 9c0 3.298 1.408 6.273 3.5 8.243l.534.425a1.125 1.125 0 001.442-.423l.256-.513a1.125 1.125 0 00-.423-1.442l-.534-.425c-1.396-1.31-2.203-3.13-2.203-5.088 0-4.004 3.248-7.252 7.252-7.252S19.252 7.996 19.252 12c0 1.958-.807 3.778-2.203 5.088l-.534.425a1.125 1.125 0 00-.423 1.442l.256.513c.231.463.793.617 1.442.423l.534-.425C20.342 17.523 22.5 14.887 22.5 12c0-5.01-4.425-9-9.75-9zM12 11.25a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" /></svg>' }, // Coal lump
            { name: 'Refined Petroleum Products', description: 'Gasoline, diesel, jet fuel – derived from crude oil.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-red-700 mx-auto"><path fill-rule="evenodd" d="M12.97 2.59a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L13.5 5.56v10.94a.75.75 0 01-1.5 0V5.56L5.53 11.15a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 01.44-.22z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12.97 2.59a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L13.5 5.56v10.94a.75.75 0 01-1.5 0V5.56L5.53 11.15a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 01.44-.22z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 15.75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0v-3.75a.75.75 0 01.75-.75z" clip-rule="evenodd" /></svg>' }, // Fuel pump
        ],
        'Metals & Minerals': [
            { name: 'Iron Ore', description: 'Primary raw material for steel production globally.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-700 mx-auto"><path fill-rule="evenodd" d="M3.75 6.75a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V6.75zM12 8.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM10.5 12a.75.75 0 00-1.5 0v.008a.75.75 0 001.5 0V12zm3 0a.75.75 0 00-1.5 0v.008a.75.75 0 001.5 0V12z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Rock/ore
            { name: 'Copper', description: 'Ductile metal with high thermal and electrical conductivity, vital for electronics and construction.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-orange-700 mx-auto"><path fill-rule="evenodd" d="M1.5 5.625c0-1.144.496-2.195 1.34-2.932A3.375 3.375 0 016.75 2.25h10.5c1.236 0 2.364.516 3.16 1.393.844.737 1.34 1.788 1.34 2.932v12.75A1.5 1.5 0 0121 20.25H3a1.5 1.5 0 01-1.5-1.5V5.625zM6 10a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H6zM18 10a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H18zM12 10a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Wire/coil
            { name: 'Aluminum', description: 'Lightweight and corrosion-resistant, used in aerospace, automotive, and packaging.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-gray-400 mx-auto"><path fill-rule="evenodd" d="M19.5 7.5a3 3 0 00-3-3h-9a3 3 0 00-3 3v9a3 3 0 003 3h9a3 3 0 003-3v-9zM8.25 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Ingot
            { name: 'Zinc', description: 'Used in galvanizing steel, batteries, and die-casting alloys.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-500 mx-auto"><path fill-rule="evenodd" d="M10.875 1.5C11.625 1.5 12 1.875 12 2.625V18h.008a.75.75 0 01-.008 1.5H12v2.25a.75.75 0 01-1.5 0V19.5H10.5v-2.25h-.008a.75.75 0 01.008-1.5H10.5v-2.25h-.008a.75.75 0 01.008-1.5H10.5v-2.25h-.008a.75.75 0 01.008-1.5H10.5V6a.75.75 0 01-1.5 0V4.5H9v-2.25a.75.75 0 01-1.5 0V1.5H10.875z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Battery
            { name: 'Lead', description: 'Used in batteries, ammunition, and radiation shielding.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-600 mx-auto"><path fill-rule="evenodd" d="M10.5 6a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6zM13.5 6a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6zM12 18a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Shield
            { name: 'Nickel', description: 'Key component in stainless steel, alloys, and batteries.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Coin/disc
            { name: 'Gold', description: 'Precious metal used in jewelry, finance, and electronics.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-500 mx-auto"><path fill-rule="evenodd" d="M10.75 1.5a.75.75 0 00-.75.75V3.75h1.5V2.25a.75.75 0 00-.75-.75zM12 21a9 9 0 100-18 9 9 0 000 18z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M10.75 1.5a.75.75 0 00-.75.75V3.75h1.5V2.25a.75.75 0 00-.75-.75zM12 21a9 9 0 100-18 9 9 0 000 18z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 18a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 6a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Gold bar
            { name: 'Silver', description: 'Precious metal with high conductivity, used in electronics and photography.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-gray-300 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Silver coin
            { name: 'Platinum', description: 'Rare metal used in catalytic converters, jewelry, and dentistry.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-400 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Platinum bar
        ],
        'Agricultural Products': [
            { name: 'Wheat', description: 'Globally important cereal crop, key for food production.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-600 mx-auto"><path fill-rule="evenodd" d="M8.25 6.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H8.25zM12 6.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zM15.75 6.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H15.75zM12 21a9 9 0 100-18 9 9 0 000 18z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Wheat stalk
            { name: 'Corn (Maize)', description: 'Versatile crop used for food, animal feed, and biofuels.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Corn cob
            { name: 'Soybeans', description: 'High-protein crop for feed, oil, and various food products.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-lime-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Soybean pod
            { name: 'Sugar', description: 'Sweet crystalline substance, used extensively in food industry.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-rose-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Sugar cube
            { name: 'Coffee', description: 'Globally traded beverage commodity.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-amber-900 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Coffee bean
            { name: 'Cocoa', description: 'Used in chocolate and other food products.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-red-800 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Cocoa bean
            { name: 'Cotton', description: 'Natural fiber used in textile industry.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-200 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Cotton boll
            { name: 'Rubber', description: 'Natural or synthetic polymer, widely used in various industries.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-900 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Rubber tree leaf
        ],
        'Chemicals & Plastics (Raw/Intermediary)': [
            { name: 'Plastic Pellets (Polyethylene, Polypropylene)', description: 'Raw forms of plastic, essential for injection molding and extrusion.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-400 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Plastic pellet
            { name: 'Sulfuric Acid', description: 'Workhorse chemical, used in fertilizers, chemicals, and refining.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-red-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Acid drop
            { name: 'Sodium Hydroxide (Caustic Soda)', description: 'Used in soaps, textiles, paper, and detergents.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-purple-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Chemical bottle
            { name: 'Ethylene', description: 'Crucial feedstock for polyethylene and other chemicals.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Molecular structure
            { name: 'Propylene', description: 'Used to produce polypropylene, resins, and fibers.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-indigo-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Molecular structure
            { name: 'Industrial Solvents', description: 'Various chemical compounds used for dissolving materials in manufacturing processes.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Flask/beaker
        ],
        'Intermediary / Semi-Finished Products': [
            { name: 'Steel Billets/Slabs/Blooms', description: 'Semi-finished steel products, foundation for bars, wires, and sheets.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9z" clip-rule="evenodd" /><path d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9z" /></svg>' }, // I-beam
            { name: 'Aluminum Ingots/Bars', description: 'Primary forms of aluminum, used in casting and manufacturing.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-gray-400 mx-auto"><path fill-rule="evenodd" d="M19.5 7.5a3 3 0 00-3-3h-9a3 3 0 00-3 3v9a3 3 0 003 3h9a3 3 0 003-3v-9zM8.25 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>' }, // Ingot
            { name: 'Textile Yarn & Fabric', description: 'Spun fibers and woven materials used in clothing and home goods production.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-pink-400 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Yarn spool
            { name: 'Wood Pulp', description: 'Raw material for paper, cardboard, and other cellulose products.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-amber-800 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Wood log/chip
            { name: 'Electronic Components (Basic)', description: 'Resistors, capacitors, diodes, and other fundamental building blocks for electronics.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-teal-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Circuit board fragment
        ],
        'Industrial & Manufactured Goods': [
            { name: 'Steel Rebar', description: 'Reinforcing steel bar used in concrete construction.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Rebar cross-section
            { name: 'Cement', description: 'Binding material for concrete and construction.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Cement bag
            { name: 'Industrial Pumps', description: 'Used for moving fluids in various industrial applications.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-cyan-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Pump
            { name: 'Generators (Industrial)', description: 'Converts mechanical energy into electrical energy for various industries.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Generator
            { name: 'Heavy Machinery Parts', description: 'Components for construction, mining, and agricultural machinery.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-orange-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Gear
            { name: 'Automotive Components', description: 'Parts for vehicle manufacturing, including engines, body panels, etc.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-gray-800 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Car wheel
            { name: 'Textile Products (Finished)', description: 'Fabrics, ready-made garments, home textiles.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-pink-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Shirt
            { name: 'Electrical Cables & Wires', description: 'Conductors for power transmission and electrical systems.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-yellow-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Electrical plug
            { name: 'Solar Panels', description: 'Devices for converting sunlight into electricity.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Solar panel
            { name: 'Wind Turbines', description: 'Equipment for converting wind energy into electricity.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-teal-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Wind turbine
            { name: 'Pharmaceutical Raw Materials', description: 'Active pharmaceutical ingredients (APIs) and excipients for drug manufacturing.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-lime-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Pill/capsule
            { name: 'Specialty Chemicals', description: 'Chemicals used for specific applications, e.g., in paints, coatings, adhesives.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-indigo-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Atom
            { name: 'Construction Aggregates', description: 'Sand, gravel, and crushed stone for concrete and infrastructure.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-amber-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Heap of gravel
            { name: 'Wood Products (Lumber, Plywood)', description: 'Processed timber for construction and furniture manufacturing.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-amber-900 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Stack of wood planks
            { name: 'Paper Products', description: 'Various types of paper, cardboard, and packaging materials.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-400 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Stack of paper
        ],
        'Recyclables & Environmental Solutions': [
            { name: 'Recycled Plastics (PET, HDPE, PVC, LDPE, PP, PS, Other)', description: 'Post-consumer and industrial plastic waste for reprocessing into new products, supporting a circular economy.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Recycling symbol for plastics
            { name: 'Scrap Metals (Ferrous & Non-Ferrous)', description: 'Recyclable metal waste including steel, aluminum, copper, and brass for melting and re-use, reducing mining impacts.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Magnet with scrap
            { name: 'Waste Paper & Cardboard', description: 'Recovered paper and packaging materials for pulp and paper mills, reducing deforestation.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Stack of folded paper
            { name: 'Cullet (Recycled Glass)', description: 'Crushed waste glass used in new glass production, reducing energy consumption.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-400 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Broken glass shards
            { name: 'E-Waste (Electronic Waste)', description: 'Discarded electronic devices, a source of valuable materials and hazardous substances, requiring responsible recycling.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-800 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Computer chip
            { name: 'Organic Waste Solutions', description: 'Technologies and services for composting and anaerobic digestion of organic waste to produce biogas and fertilizer.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Compost bin
            { name: 'Hazardous Waste Management', description: 'Solutions for the safe collection, transportation, treatment, and disposal of hazardous industrial waste.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-red-700 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Biohazard symbol
        ],
    };

    // No longer need this useEffect as search bar is removed from homepage
    // and ProductsPage handles its own filtering based on searchTerm prop
    // useEffect(() => {
    //     const allProducts = Object.values(productData).flat(); // Flatten all products into a single array
    //     if (searchTerm) {
    //         const lowercasedSearchTerm = searchTerm.toLowerCase();
    //         const results = allProducts.filter(product =>
    //             product.name.toLowerCase().includes(lowercasedSearchTerm) ||
    //             product.description.toLowerCase().includes(lowercasedSearchTerm)
    //         );
    //         setFilteredProducts(results);
    //     } else {
    //         setFilteredProducts([]); // Clear results if search term is empty
    //     }
    // }, [searchTerm]);

    // Page Components

    // HeroBanner Component for the Home Page
    const HeroBanner = ({ svgContent, title, subtitle }) => (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl text-center mb-10">
            <div dangerouslySetInnerHTML={{ __html: svgContent }} className="mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
            <p className="text-lg md:text-xl font-light max-w-3xl mx-auto opacity-90">{subtitle}</p>
        </div>
    );

    const HomePage = ({ globalTradeSvg }) => (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-4 text-center">
            <HeroBanner
                svgContent={globalTradeSvg}
                title="Your Global Trading Partner"
                subtitle="Connecting markets and delivering comprehensive solutions for your worldwide supply chain needs."
            />
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
                Leveraging over two decades of expertise in finance, logistics, manufacturing, and trading to deliver comprehensive solutions for your global supply chain needs.
            </p>
        </div>
    );

    const AboutUsPage = () => (
        <div className="p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">About Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
                At IGap Trading, we bring a wealth of knowledge and practical experience to the complex world of global commodity and product trading. With over two decades of dedicated involvement in finance, logistics, manufacturing, and international trade, our foundation is built on deep industry insight and a proven track record.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
                Headquartered in the vibrant economic hub of the **United Arab Emirates**, we strategically operate with a global reach. Our robust network extends through our established offices in **Canada**, the **United Kingdom**, **India**, and **Pakistan**, enabling us to efficiently connect markets and streamline international transactions.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
                We pride ourselves on our holistic approach, managing the **complete trade cycle** from the initial procurement of raw materials to the final delivery at the buyer's designated location. Our expertise in logistics ensures **just-in-time deliveries**, optimizing supply chains and minimizing costs for our partners.
            </p>
            <p className="text-gray-700 leading-relaxed">
                Our comprehensive understanding spans every facet of trade – from intricate financial structures and trade finance mechanisms to banking relations, technological integration, and hands-on operational excellence. This allows us to engage at any point in the value chain, from securing raw materials to facilitating seamless sales proceeds collection and handover to sellers.
            </p>
        </div>
    );

    const ExpertisePage = () => (
        <div className="p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">Our Expertise & Value Proposition</h2>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.767 8.767 0 0115.75 6.75a.75.75 0 00.724-.724A9 9 0 1021 12.75h-.254a3.75 3.75 0 01-3.672-3.218 3.75 3.75 0 013.672-4.218z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.767 8.767 0 0115.75 6.75a.75.75 0 00.724-.724A9 9 0 1021 12.75h-.254a3.75 3.75 0 01-3.672-3.218 3.75 3.75 0 013.672-4.218z" />
                    </svg>
                    Comprehensive Trade Cycle Management
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    We manage the entire trade lifecycle, ensuring seamless operations from the initial procurement of raw materials to their final delivery at the buyer’s designated location. Our end-to-end solutions cover every critical step, providing efficiency and peace of mind.
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18L17.25 9M17.25 9a.75.75 0 01.75.75V18M17.25 9h-8.25" />
                    </svg>
                    Logistics for Just-in-Time Deliveries
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    Our robust logistics capabilities are designed to facilitate just-in-time (JIT) deliveries, ensuring that products reach their destination precisely when needed. This meticulous planning minimizes storage costs, optimizes inventory, and enhances operational flow for our clients.
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.305a11.164 11.164 0 005.814-5.594 1.5 1.5 0 012.115-.177l.754.754H3.921a.75.75 0 01-.708-.868L4.148 2.5z" />
                    </svg>
                    Holistic Understanding & Operational Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    Our team possesses a holistic understanding of the entire trade ecosystem, encompassing financial intricacies, trade finance, banking operations, cutting-edge technology, and practical operational expertise. This allows us to strategically intervene and add value at any level of the supply chain, from sourcing raw materials to managing sales proceeds.
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
                    </svg>
                    Global Network & Market Access
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    With our head office in the UAE and branch offices in Canada, UK, India, and Pakistan, we offer unparalleled global market access. This extensive network facilitates seamless cross-border transactions and enables us to identify and capitalize on emerging opportunities worldwide.
                </p>
            </div>
        </div>
    );

    const ProductsPage = ({ products, searchTerm }) => {
        // State for expanded product details
        const [expandedProduct, setExpandedProduct] = useState(null);

        // Filter products based on search term (if any)
        const filteredAndCategorizedProducts = {};
        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            for (const category in products) {
                const filtered = products[category].filter(product =>
                    product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                    product.description.toLowerCase().includes(lowercasedSearchTerm)
                );
                if (filtered.length > 0) {
                    filteredAndCategorizedProducts[category] = filtered;
                }
            }
        } else {
            // If no search term, display all products by category
            Object.assign(filteredAndCategorizedProducts, products);
        }

        return (
            <div className="p-6 md:p-8 lg:p-10 max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">Our Products</h2>

                {Object.keys(filteredAndCategorizedProducts).length === 0 && searchTerm && (
                    <p className="text-gray-600 text-center text-lg mt-8">No products found matching "{searchTerm}".</p>
                )}

                {Object.entries(filteredAndCategorizedProducts).map(([category, productsList]) => (
                    <div key={category} className="mb-10">
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5L12 3.75m9 3.75L12 3.75m9 3.75v9l-8.25 4.5-8.25-4.5v-9m9 3.75l-8.25 4.5m8.25-4.5v9l-8.25 4.5" />
                            </svg>
                            {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {productsList.map((product, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                                    onClick={() => setExpandedProduct(expandedProduct === product ? null : product)}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: product.svg }} />
                                    <h4 className="text-xl font-medium text-gray-900 mt-4 mb-2">{product.name}</h4>
                                    <p className="text-gray-600 text-sm">{product.description}</p>
                                    {expandedProduct === product && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 w-full text-left">
                                            <p className="text-gray-700 font-medium">Details:</p>
                                            <p className="text-gray-600 text-sm">{product.description} More specific details on quality, origin, and typical applications would be available upon inquiry.</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Navigation Bar Component
    const Navbar = () => (
        <nav className="bg-gray-900 p-4 shadow-lg fixed top-0 w-full z-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-white text-2xl font-bold mb-4 md:mb-0 cursor-pointer" onClick={() => setCurrentPage('home')}>
                    IGap Trading
                </div>
                <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8 text-lg">
                    <li>
                        <button
                            onClick={() => setCurrentPage('home')}
                            className={`text-white hover:text-blue-400 transition-colors duration-300 ${currentPage === 'home' ? 'text-blue-400 font-semibold' : ''}`}
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentPage('about')}
                            className={`text-white hover:text-blue-400 transition-colors duration-300 ${currentPage === 'about' ? 'text-blue-400 font-semibold' : ''}`}
                        >
                            About Us
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentPage('expertise')}
                            className={`text-white hover:text-blue-400 transition-colors duration-300 ${currentPage === 'expertise' ? 'text-blue-400 font-semibold' : ''}`}
                        >
                            Expertise
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentPage('products')}
                            className={`text-white hover:text-blue-400 transition-colors duration-300 ${currentPage === 'products' ? 'text-blue-400 font-semibold' : ''}`}
                        >
                            Products
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );

    // Footer Component
    const Footer = () => (
        <footer className="bg-gray-900 text-white p-6 md:p-8 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">IGap Trading</h3>
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                    <p className="text-gray-400">Email: <a href="mailto:contact@igaptrading.com" className="hover:text-blue-400">contact@igaptrading.com</a></p>
                    <p className="text-gray-400">Phone (UAE): <a href="tel:+971564166810" className="hover:text-blue-400">+971 564166810</a></p>
                    <p className="text-gray-400">Phone (UK): <a href="tel:+447747238071" className="hover:text-blue-400">+44 7747238071</a></p>
                    <a
                        href="https://wa.me/971564166810"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-400 hover:text-green-300 mt-2 rounded-full px-3 py-1 bg-green-700 hover:bg-green-600 transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.557-3.844-1.557-5.874 0-6.19 5.023-11.216 11.216-11.216 3.09 0 6.008 1.246 8.196 3.434s3.434 5.106 3.434 8.196c0 6.19-5.023 11.216-11.216 11.216-1.996 0-3.923-.529-5.61-1.44l-6.262 1.625zm6.559-4.836c1.324.793 2.894 1.291 4.59.261 4.298-2.679 6.467-9.421 4.793-13.687-1.391-3.696-6.666-5.882-10.42-3.876-2.583 1.341-4.116 4.316-4.116 7.643 0 1.258.266 2.477.784 3.633l-1.579 5.867 5.867-1.579zm6.758-2.923c-.272-.134-.582-.201-.9-.201-.318 0-.628.067-.9.201-.272.134-.49.33-.652.582-.162.252-.244.536-.244.852 0 .316.082.6.244.852.162.252.38.448.652.582.272.134.582.201.9.201.318 0 .628-.067.9-.201l.732-.366c.272-.134.49-.33.652-.582.162-.252.244-.536.244-.852 0-.316-.082-.6-.244-.852-.162-.252-.38-.448-.652-.582l-.732-.366z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );

    // Main render logic based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage globalTradeSvg={globalTradeSvg} />;
            case 'about':
                return <AboutUsPage />;
            case 'expertise':
                return <ExpertisePage />;
            case 'products':
                // Since there's no search bar on home, searchTerm will effectively be empty
                // unless it's set by another mechanism. ProductsPage will display all products.
                return <ProductsPage products={productData} searchTerm={searchTerm} />;
            default:
                return <HomePage globalTradeSvg={globalTradeSvg} />;
        }
    };

    return (
        <div className="font-inter antialiased bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: .5;
                    }
                }
                `}
            </style>
            <script src="https://cdn.tailwindcss.com"></script>
            <Navbar />
            <main className="flex-grow mt-16 pb-8"> {/* Added mt-16 to account for fixed navbar height */}
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;

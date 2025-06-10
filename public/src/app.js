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
            { name: 'Pharmaceutical Raw Materials', description: 'Active pharmaceutical ingredients (APIs) and excipients for drug manufacturing.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-lime-500 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Pharmaceutical pill
        ],
        'Commodity-Linked Financial Instruments': [
            { name: 'Futures Contracts (e.g., WTI Crude Futures)', description: 'Agreements to buy/sell a commodity at a predetermined price and date.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-green-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Chart/graph
            { name: 'Options Contracts', description: 'Gives the holder the right, but not the obligation, to buy/sell a commodity.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Scales of justice
            { name: 'Exchange Traded Funds (ETFs)', description: 'Investment funds that hold commodities or commodity futures.', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-purple-600 mx-auto"><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 2.25c-5.325 0-9.75 3.99-9.75 9s4.425 9 9.75 9 9.75-3.99 9.75-9-4.425-9-9.75-9zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12z" clip-rule="evenodd" /></svg>' }, // Stock chart
        ],
    };

    // Placeholder for API key, if needed for future LLM integration.
    // const apiKey = "";

    // Component to render the Home page
    const HomePage = ({ setCurrentPage }) => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
            <header className="w-full max-w-4xl text-center mb-12">
                <div className="flex items-center justify-center">
                    {/* SVG Icon for Global Trade */}
                    <div dangerouslySetInnerHTML={{ __html: globalTradeSvg }} />
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 leading-tight">
                        IGap Trading
                    </h1>
                </div>
                <p className="mt-4 text-xl md:text-2xl text-gray-600">
                    Your Gateway to Global Commodity Trade
                </p>
            </header>

            <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 max-w-4xl w-full text-center border-b-4 border-blue-500 transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    What We Offer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    At IGap Trading, we specialize in facilitating the seamless and efficient trade of a wide range of global commodities. Leveraging deep market insights and a robust network, we connect buyers and sellers across continents, ensuring transparency, reliability, and competitive pricing.
                </p>
                <button
                    onClick={() => setCurrentPage('products')}
                    className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Explore Products
                </button>
            </section>

            <section className="bg-blue-700 text-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl w-full text-center transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg leading-relaxed">
                    To be the leading platform for global commodity trade, empowering businesses with the tools and connections they need to thrive in an interconnected world.
                </p>
            </section>

            <footer className="mt-12 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} IGap Trading. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#privacy" className="hover:underline">Privacy Policy</a>
                    <a href="#terms" className="hover:underline">Terms of Service</a>
                </div>
            </footer>
        </div>
    );

    // Component to display Products by Category
    const ProductsPage = ({ setCurrentPage }) => {
        const [activeCategory, setActiveCategory] = useState(Object.keys(productData)[0]); // Set first category as default

        return (
            <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
                <header className="bg-blue-700 text-white p-6 rounded-b-3xl shadow-lg text-center relative mb-8">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 rounded-full shadow hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        &larr; Back to Home
                    </button>
                    <h1 className="text-4xl font-extrabold">Our Products</h1>
                    <p className="mt-2 text-lg">Diverse Commodities for Global Markets</p>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Category Navigation */}
                    <nav className="flex flex-wrap justify-center gap-4 mb-8">
                        {Object.keys(productData).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md
                                    ${activeCategory === category
                                        ? 'bg-blue-600 text-white border-2 border-blue-800'
                                        : 'bg-white text-blue-700 border-2 border-blue-400 hover:bg-blue-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>

                    {/* Product Listing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {productData[activeCategory] && productData[activeCategory].map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-blue-500 transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div dangerouslySetInnerHTML={{ __html: product.svg }} className="mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-gray-700 text-base">{product.description}</p>
                                <button
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    onClick={() => alert(`Inquiry for ${product.name}`)} // Using alert for now, consider a custom modal
                                >
                                    Inquire
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="mt-12 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} IGap Trading. All rights reserved.</p>
                </footer>
            </div>
        );
    };

    // Simple routing logic using a switch statement
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'products':
                return <ProductsPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="font-sans antialiased">
            {/* Tailwind CSS CDN - Ensure this is in public/index.html head for full effect */}
            {/* <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"> */}
            {/* Inter font from Google Fonts */}
            {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"> */}

            {renderPage()}
        </div>
    );
};

export default App; // Export the App component as default

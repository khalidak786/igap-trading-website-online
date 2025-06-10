document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length > 2) {
                // In a real implementation, you would fetch results from a database or API
                // For this example, we'll simulate search results
                const simulatedResults = [
                    {
                        title: "Copper Scrap",
                        description: "High-grade copper scrap for recycling and manufacturing",
                        url: "products/commodities.html#copper"
                    },
                    {
                        title: "Plastic Pellets",
                        description: "Virgin and recycled plastic pellets for various applications",
                        url: "products/recyclables.html#plastics"
                    },
                    {
                        title: "Steel Coils",
                        description: "Cold-rolled and hot-rolled steel coils for industrial use",
                        url: "products/semi-finished.html#steel"
                    },
                    {
                        title: "About Our Logistics",
                        description: "Learn about our global logistics capabilities",
                        url: "expertise.html#logistics"
                    }
                ];
                
                const filteredResults = simulatedResults.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.description.toLowerCase().includes(query)
                );
                
                displaySearchResults(filteredResults);
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        function displaySearchResults(results) {
            searchResults.innerHTML = '';
            
            if (results.length > 0) {
                results.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <h4>${result.title}</h4>
                        <p>${result.description}</p>
                    `;
                    item.addEventListener('click', function() {
                        window.location.href = result.url;
                    });
                    searchResults.appendChild(item);
                });
                searchResults.style.display = 'block';
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'search-result-item';
                noResults.textContent = 'No results found';
                searchResults.appendChild(noResults);
                searchResults.style.display = 'block';
            }
        }
        
        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Product filtering
    const categorySelect = document.getElementById('category-select');
    const productsGrid = document.querySelector('.products-grid');
    
    if (categorySelect && productsGrid) {
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            filterProducts(category);
        });
        
        function filterProducts(category) {
            // In a real implementation, you would fetch filtered products from a database or API
            // For this example, we'll simulate filtered products
            const allProducts = [
                {
                    id: 1,
                    category: 'agricultural',
                    name: 'Wheat',
                    description: 'High-quality wheat for food production',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#f8d56b"/>
                        <path d="M20,50 Q50,20 80,50 T20,50" fill="#e6c35c" stroke="#d4b14e" stroke-width="1"/>
                        <path d="M30,60 Q50,30 70,60 T30,60" fill="#e6c35c" stroke="#d4b14e" stroke-width="1"/>
                        <path d="M25,40 Q50,60 75,40 T25,40" fill="#e6c35c" stroke="#d4b14e" stroke-width="1"/>
                    </svg>`
                },
                {
                    id: 2,
                    category: 'metals',
                    name: 'Copper Cathodes',
                    description: '99.99% pure copper cathodes for industrial use',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#b87333"/>
                        <rect x="10" y="10" width="80" height="80" fill="#d79b52" stroke="#a15c2c" stroke-width="2"/>
                        <rect x="20" y="20" width="60" height="60" fill="#b87333" stroke="#8a4b1f" stroke-width="2"/>
                    </svg>`
                },
                {
                    id: 3,
                    category: 'energy',
                    name: 'Crude Oil',
                    description: 'Light sweet crude oil for refining',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#333"/>
                        <circle cx="50" cy="50" r="40" fill="#000"/>
                        <path d="M30,30 Q50,10 70,30 T50,70 Q30,50 70,50 T30,70 Q50,90 70,70" fill="none" stroke="#555" stroke-width="2"/>
                    </svg>`
                },
                {
                    id: 4,
                    category: 'chemical',
                    name: 'Soda Ash',
                    description: 'Industrial grade soda ash for manufacturing',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#f0f0f0"/>
                        <circle cx="30" cy="30" r="15" fill="#fff" stroke="#ddd" stroke-width="1"/>
                        <circle cx="70" cy="30" r="15" fill="#fff" stroke="#ddd" stroke-width="1"/>
                        <circle cx="50" cy="60" r="20" fill="#fff" stroke="#ddd" stroke-width="1"/>
                    </svg>`
                },
                {
                    id: 5,
                    category: 'agricultural',
                    name: 'Palm Oil',
                    description: 'Refined palm oil for food and industrial use',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#f0e68c"/>
                        <path d="M20,50 Q50,80 80,50 L50,20 Z" fill="#daa520" stroke="#b8860b" stroke-width="1"/>
                        <path d="M30,60 Q50,30 70,60 L50,90 Z" fill="#daa520" stroke="#b8860b" stroke-width="1"/>
                    </svg>`
                },
                {
                    id: 6,
                    category: 'metals',
                    name: 'Aluminum Ingots',
                    description: 'High purity aluminum ingots for manufacturing',
                    image: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#d9d9d9"/>
                        <rect x="20" y="20" width="60" height="60" fill="#c0c0c0" stroke="#a9a9a9" stroke-width="2"/>
                        <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="#a9a9a9" opacity="0.3"/>
                    </svg>`
                }
            ];
            
            const filteredProducts = category === 'all' 
                ? allProducts 
                : allProducts.filter(product => product.category === category);
            
            displayProducts(filteredProducts);
        }
        
        function displayProducts(products) {
            productsGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        ${product.image}
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }
        
        // Initialize with all products
        filterProducts('all');
    }
});

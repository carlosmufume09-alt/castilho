'use client';

import React, { useState, useEffect } from 'react';
import './shellsFashionElegance.css';

const ShellsFashion = () => {
  const API_HOST = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const API_BASE_URL = API_HOST ? `${API_HOST}/api/products` : '/api/products';
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const normalized = imagePath.replace(/^\.\//, '/');
    return `${API_HOST}${normalized.startsWith('/') ? normalized : `/${normalized}`}`;
  };

  const normalizeProduct = (product) => ({
    ...product,
    id: product.id || product._id
  });

  // ============ CATEGORIAS ============
  const categories = ['Todos', 'Vestuário', 'Acessórios', 'Calçados'];

  // ============ ESTADOS ============
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Vestuário',
    image: null,
    description: ''
  });
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // ============ CARREGAR PRODUTOS DA API ============
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('[v0] Carregando produtos de:', `${API_BASE_URL}`);
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        
        console.log('[v0] Dados recebidos:', data);
        if (data.success) {
          setProducts((data.data || []).map(normalizeProduct));
        }
      } catch (error) {
        console.error('[v0] Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ============ OBTER PRODUTOS ALEATÓRIOS (20 produtos) ============
  const randomProducts = products.length > 0 
    ? [...products].sort(() => 0.5 - Math.random()).slice(0, 20)
    : [];

  // ============ FILTRAR PRODUTOS ============
  const filteredProducts = randomProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ============ WHATSAPP CHECKOUT ============
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const items = cart.map(item => `${item.name} (x${item.quantity}) - MZN ${(item.price * item.quantity).toLocaleString()}`).join('\n');
    const total = `Total: MZN ${cartTotal.toLocaleString()}`;
    const message = `Olá! Gostaria de comprar:\n\n${items}\n\n${total}`;
    window.open(`https://wa.me/258879992762?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]);
  };

  // ============ ADMIN LOGIN ============
  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log('[v0] Tentando login com código:', adminCode);
    if (adminCode === 'shopall' && adminPassword === '123456') {
      setAdminAuth(true);
      setCurrentPage('admin');
      console.log('[v0] Login bem sucedido!');
    } else {
      console.log('[v0] Credenciais incorretas!');
      alert('Código ou senha incorretos!');
    }
  };

  // ============ ADICIONAR NOVO PRODUTO ============
  const handleAddProduct = async (e) => {
    e.preventDefault();

    console.log('[v0] Tentando adicionar produto');
    console.log('[v0] newProduct:', newProduct);

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Preencha todos os campos obrigatórios (Nome, Preço e Imagem)!');
      return;
    }

    const productData = {
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      description: newProduct.description,
      rating: 4.8,
      sales: 0
    };

    console.log('[v0] Dados do produto:', productData);

    try {
      setUploading(true);
      console.log('[v0] Enviando para:', `${API_BASE_URL}`);

      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      console.log('[v0] Status resposta:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[v0] Resposta do servidor:', data);

      if (data.success) {
        setProducts([...products, normalizeProduct(data.data)]);
        setNewProduct({ name: '', price: '', category: 'Vestuário', image: null, description: '' });
        alert('Produto adicionado com sucesso!');
        document.getElementById('imageInput').value = '';
        setAdminTab('products');
      } else {
        alert('Erro ao adicionar produto: ' + (data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('[v0] Erro ao adicionar produto:', error);
      console.error('[v0] Stack:', error.stack);
      alert('Erro ao adicionar produto: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // ============ UPLOAD DE IMAGEM ============
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('[v0] Upload iniciado:', file.name);

    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande! Máximo 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato não permitido! Use JPG, PNG ou WebP');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      console.log('[v0] Enviando para:', `${API_BASE_URL}/upload`);
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      console.log('[v0] Status resposta:', response.status);
      console.log('[v0] Headers resposta:', response.headers.get('content-type'));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[v0] Dados recebidos:', data);

      if (data.success) {
        setNewProduct({ ...newProduct, image: data.filePath });
        alert('Imagem enviada com sucesso!');
      } else {
        alert('Erro ao enviar imagem: ' + (data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('[v0] Erro no upload:', error);
      console.error('[v0] Stack:', error.stack);
      alert('Erro ao enviar imagem: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // ============ DELETAR PRODUTO ============
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Tem a certeza que deseja deletar este produto?')) {
      return;
    }

    try {
      console.log('[v0] Deletando produto:', productId);
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(products.filter(p => p.id !== productId));
        alert('Produto deletado com sucesso!');
      } else {
        alert('Erro ao deletar produto: ' + (data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('[v0] Erro ao deletar produto:', error);
      alert('Erro ao deletar produto: ' + error.message);
    }
  };

  // ============ EDITAR PRODUTO ============
  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!editingProduct.name || !editingProduct.price || !editingProduct.category) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      console.log('[v0] Atualizando produto:', editingProduct.id);
      
      const response = await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editingProduct.name,
          price: parseInt(editingProduct.price),
          category: editingProduct.category,
          description: editingProduct.description
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } : p));
        setShowEditForm(false);
        setEditingProduct(null);
        alert('Produto atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar produto: ' + (data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('[v0] Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto: ' + error.message);
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  // ============ RENDERIZAR ============
  return (
    <div className="shells-fashion-container">
      {/* HEADER */}
      <header className="header-premium">
        <div className="header-wrapper">
          <div className="logo-section" onClick={() => { setCurrentPage('home'); setSearchTerm(''); setSelectedCategory('Todos'); }}>
            <h1 className="logo-text">✨ Shells Fashion</h1>
            <p className="logo-subtitle">Elegance & Femininity</p>
          </div>

          <nav className="nav-menu">
            <button className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => { setCurrentPage('home'); setSearchTerm(''); setSelectedCategory('Todos'); }}>
              🏪 Loja
            </button>
            <button className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`} onClick={() => setCurrentPage('cart')}>
              🛍️ Carrinho ({cart.length})
            </button>
            <button className={`nav-btn ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => setCurrentPage('profile')}>
              👤 Perfil
            </button>
            <button className={`nav-btn ${currentPage === 'admin-login' ? 'active' : ''}`} onClick={() => setCurrentPage('admin-login')}>
              ⚙️ Admin
            </button>
          </nav>

          <div className="contact-info">
            <a href="tel:+258847052762" className="contact-badge" title="Ligar">
              <span className="badge-icon">📞</span>
            </a>
            <a href="https://wa.me/258879992762" className="contact-badge whatsapp" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <span className="badge-icon">💬</span>
            </a>
          </div>
        </div>
      </header>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <div className="home-page">
          {/* HERO SECTION */}
          <section className="hero-section">
            <div className="hero-content">
              <h2 className="hero-title">Descubra Elegância e Estilo</h2>
              <p className="hero-subtitle">Coleção premium de moda para mulheres sofisticadas</p>
              <p className="hero-location">📍 Maputo - KHONGOLOTE | 🌟 Frete Grátis</p>
            </div>
            <div className="hero-animation">
              <div className="float-box"></div>
              <div className="float-box"></div>
            </div>
          </section>

          {/* SEARCH & FILTERS */}
          <section className="search-section">
            <div className="search-wrapper">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="🔍 Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-buttons">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCTS GRID */}
          <section className="products-section">
            <h3 className="products-title">Destaques da Coleção</h3>
            {loading ? (
              <div className="loading-message">Carregando produtos...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="loading-message">Nenhum produto encontrado</div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="product-image-wrapper">
                      <img src={resolveImageUrl(product.image)} alt={product.name} className="product-image" />
                      <div className="product-overlay">
                        <button className="btn-view" onClick={() => addToCart(product)}>
                          ➕ Adicionar
                        </button>
                      </div>
                      <span className="product-badge">{product.category}</span>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-meta">
                        <div className="rating">⭐ {product.rating} ({product.sales})</div>
                      </div>
                      <div className="product-footer">
                        <span className="product-price">MZN {product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FOOTER */}
          <footer className="footer-section">
            <div className="footer-content">
              <div className="footer-col">
                <h4>📞 Contactos</h4>
                <p>Tel: +258 847052762</p>
                <p>WhatsApp: +258 879992762</p>
                <p>📍 Maputo - KHONGOLOTE</p>
              </div>
              <div className="footer-col">
                <h4>ℹ️ Sobre</h4>
                <p>Shells Fashion Elegance - Sua boutique online premium de moda e estilo.</p>
              </div>
              <div className="footer-col">
                <h4>🌐 Redes Sociais</h4>
                <p>Instagram | Facebook | TikTok</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Shells Fashion Elegance. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      )}

      {/* CART PAGE */}
      {currentPage === 'cart' && (
        <div className="cart-page">
          <div className="cart-container">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🛒</div>
                <h2>Seu carrinho está vazio</h2>
                <p>Comece a fazer suas compras!</p>
                <button className="btn-continue" onClick={() => setCurrentPage('home')}>
                  Voltar às Compras
                </button>
              </div>
            ) : (
              <>
                <h2 className="cart-title">🛍️ Seu Carrinho</h2>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item" style={{ animation: 'slideInLeft 0.6s ease-out' }}>
                      <img src={resolveImageUrl(item.image)} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p className="cart-item-price">MZN {item.price.toLocaleString()}</p>
                      </div>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="item-total">
                        MZN {(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button className="btn-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>MZN {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                  <div className="summary-row total">
                    <span>💰 Total:</span>
                    <span>MZN {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="cart-actions">
                  <button className="btn-continue" onClick={() => setCurrentPage('home')}>
                    Continuar Comprando
                  </button>
                  <button className="btn-checkout" onClick={handleCheckout}>
                    ✅ Finalizar via WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PROFILE PAGE */}
      {currentPage === 'profile' && (
        <div className="profile-page">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image-container">
                <img 
                  src="./IMG-20260526-WA0003.jpg" 
                  alt="Proprietária" 
                  className="profile-image"
                />
              </div>
              <div className="profile-info">
                <h2 className="profile-name">Shells Fashion Elegance</h2>
                <p className="profile-role">👑 Boutique Premium de Moda</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h3>📍 Localização</h3>
                <p>Maputo - KHONGOLOTE, Moçambique</p>
              </div>

              <div className="detail-section">
                <h3>📞 Contactos</h3>
                <p>☎️ Tel: +258 847052762</p>
                <p>💬 WhatsApp: +258 879992762</p>
              </div>

              <div className="detail-section">
                <h3>ℹ️ Sobre a Loja</h3>
                <p>Bem-vinda à Shells Fashion Elegance, sua boutique online premium dedicada a mulheres sofisticadas que buscam elegância, qualidade e estilo único. Oferecemos coleções exclusivas de roupas, acessórios e calçados premium.</p>
              </div>

              <div className="detail-section">
                <h3>🎁 Benefícios</h3>
                <ul className="benefits-list">
                  <li>✅ Frete Grátis</li>
                  <li>✅ Qualidade Premium</li>
                  <li>✅ Atendimento Personalizado</li>
                  <li>✅ Produtos Exclusivos</li>
                </ul>
              </div>
            </div>

            <button className="btn-back-profile" onClick={() => setCurrentPage('home')}>
              ← Voltar à Loja
            </button>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN */}
      {currentPage === 'admin-login' && !adminAuth && (
        <div className="admin-login-page">
          <div className="login-card">
            <h2>🔐 Área do Administrador</h2>
            <form onSubmit={handleAdminLogin}>
              <input
                type="text"
                placeholder="Código de Acesso"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="input-field"
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Senha"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="input-field"
                autoComplete="current-password"
              />
              <button type="submit" className="btn-login">Entrar</button>
              <button type="button" className="btn-back" onClick={() => setCurrentPage('home')}>
                Voltar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {currentPage === 'admin' && adminAuth && (
        <div className="admin-page">
          <div className="admin-header">
            <h2>⚙️ Painel Administrativo</h2>
            <button className="btn-logout" onClick={() => {
              setAdminAuth(false);
              setCurrentPage('home');
            }}>
              Sair
            </button>
          </div>

          <div className="admin-tabs">
            <button 
              className={`tab-btn ${adminTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setAdminTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`tab-btn ${adminTab === 'add-product' ? 'active' : ''}`}
              onClick={() => setAdminTab('add-product')}
            >
              ➕ Adicionar Produto
            </button>
            <button 
              className={`tab-btn ${adminTab === 'products' ? 'active' : ''}`}
              onClick={() => setAdminTab('products')}
            >
              📦 Gerenciar Produtos
            </button>
          </div>

          <div className="admin-content">
            {/* DASHBOARD TAB */}
            {adminTab === 'dashboard' && (
              <>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>📦 Total de Produtos</h3>
                    <p className="stat-value">{products.length}</p>
                  </div>
                  <div className="stat-card">
                    <h3>📂 Categorias</h3>
                    <p className="stat-value">{categories.length - 1}</p>
                  </div>
                  <div className="stat-card">
                    <h3>🛒 Carrinhos Ativos</h3>
                    <p className="stat-value">{cart.length}</p>
                  </div>
                  <div className="stat-card">
                    <h3>💰 Preço Médio</h3>
                    <p className="stat-value">MZN {products.length > 0 ? Math.round(products.reduce((a, b) => a + b.price, 0) / products.length) : 0}</p>
                  </div>
                </div>

                <div className="chart-section">
                  <h3>📈 Produtos por Categoria</h3>
                  <div className="category-chart">
                    {categories.slice(1).map(cat => {
                      const count = products.filter(p => p.category === cat).length;
                      const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                      return (
                        <div key={cat} className="chart-bar">
                          <div className="bar-label">{cat}</div>
                          <div className="bar-container">
                            <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <div className="bar-count">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* ADD PRODUCT TAB */}
            {adminTab === 'add-product' && (
              <div className="add-product-form">
                <h3>➕ Adicionar Novo Produto</h3>
                <form onSubmit={handleAddProduct}>
                  <div className="form-group">
                    <label>Nome do Produto *</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ex: Vestido Elegante"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Preço (MZN) *</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Ex: 2500"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Categoria *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      required
                    >
                      <option value="Vestuário">Vestuário</option>
                      <option value="Acessórios">Acessórios</option>
                      <option value="Calçados">Calçados</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Imagem do Produto *</label>
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="file-input"
                      required
                    />
                    {newProduct.image && (
                      <div className="image-preview">
                        <img src={resolveImageUrl(newProduct.image)} alt="Preview" />
                        <p>✅ Imagem enviada com sucesso!</p>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Descrição do produto..."
                      rows="4"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit" disabled={uploading || !newProduct.image}>
                    {uploading ? '⏳ Processando...' : '✅ Adicionar Produto'}
                  </button>
                </form>
              </div>
            )}

            {/* PRODUCTS TABLE TAB */}
            {adminTab === 'products' && (
              <div className="products-table">
                <h3>📦 Gerenciar Produtos ({products.length})</h3>
                {showEditForm && editingProduct && (
                  <div className="edit-product-form">
                    <h4>✏️ Editar Produto</h4>
                    <form onSubmit={handleEditProduct}>
                      <div className="form-group">
                        <label>Nome</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Preço (MZN)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Categoria</label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          required
                        >
                          <option value="Vestuário">Vestuário</option>
                          <option value="Acessórios">Acessórios</option>
                          <option value="Calçados">Calçados</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                          value={editingProduct.description || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn-save">💾 Salvar Alterações</button>
                        <button type="button" className="btn-cancel" onClick={() => { setShowEditForm(false); setEditingProduct(null); }}>❌ Cancelar</button>
                      </div>
                    </form>
                  </div>
                )}
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, idx) => {
                        const id = p.id || p._id;
                        return (
                          <tr key={id} style={{ animationDelay: `${idx * 0.05}s` }}>
                            <td><img src={resolveImageUrl(p.image)} alt={p.name} className="table-img" /></td>
                            <td>{p.name}</td>
                            <td>MZN {p.price.toLocaleString()}</td>
                            <td><span className="category-tag">{p.category}</span></td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-edit" onClick={() => startEditProduct({ ...p, id })}>✏️ Editar</button>
                                <button className="btn-delete" onClick={() => handleDeleteProduct(id)}>🗑️ Deletar</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShellsFashion;
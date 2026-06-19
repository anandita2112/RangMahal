const SAMPLE_PRODUCTS = [
  { id:1,  name:"Bridal Lac Set — Scarlet & Gold",   category:"Lac Bangles", price:549,  mrp:799,  stock:24, status:"active", color:"ph-red" },
  { id:2,  name:"Meenakari Set — Royal Blue",         category:"Lac Bangles", price:399,  mrp:599,  stock:18, status:"active", color:"ph-blue" },
  { id:3,  name:"Zardosi Set — Gold & Ivory",         category:"Lac Bangles", price:649,  mrp:950,  stock:12, status:"active", color:"ph-gold" },
  { id:4,  name:"Floral Set — Emerald & Gold",        category:"Lac Bangles", price:479,  mrp:699,  stock:30, status:"active", color:"ph-green" },
  { id:5,  name:"Kundan Set — Deep Violet",           category:"Lac Bangles", price:349,  mrp:549,  stock:8,  status:"active", color:"ph-purple" },
  { id:6,  name:"Gota Patti Set — Blush Pink",        category:"Lac Bangles", price:429,  mrp:649,  stock:15, status:"active", color:"ph-pink" },
  { id:7,  name:"Mirror Work Set — Teal & Silver",    category:"Lac Bangles", price:529,  mrp:799,  stock:20, status:"active", color:"ph-teal" },
  { id:8,  name:"Stone Studded Set — Deep Maroon",    category:"Lac Bangles", price:599,  mrp:899,  stock:6,  status:"active", color:"ph-maroon" },
  { id:9,  name:"Print Work Set — Saffron",           category:"Lac Bangles", price:379,  mrp:579,  stock:22, status:"active", color:"ph-saffron" },
  { id:10, name:"Classic Set — Pearl Ivory",          category:"Lac Bangles", price:499,  mrp:749,  stock:10, status:"active", color:"ph-ivory" },
  { id:11, name:"Thread Work Set — Navy & Gold",      category:"Lac Bangles", price:459,  mrp:699,  stock:14, status:"active", color:"ph-navy" },
  { id:12, name:"Festive Set — Rose & Silver",        category:"Lac Bangles", price:299,  mrp:499,  stock:28, status:"active", color:"ph-rose" },
];

const SAMPLE_ORDERS = [
  { id:"RM-1024", customer:"Priya Sharma",  initials:"PS", product:"Bridal Lac Set — Scarlet", qty:1, amount:549,   status:"confirmed",  date:"19 Jun 2026", address:"Malviya Nagar, Jaipur" },
  { id:"RM-1023", customer:"Ankit Kumar",    initials:"AK", product:"Meenakari Set — Royal Blue", qty:1, amount:399,  status:"shipped",    date:"18 Jun 2026", address:"Vaishali Nagar, Jaipur" },
  { id:"RM-1022", customer:"Neha Joshi",     initials:"NJ", product:"Zardosi Set — Gold & Ivory", qty:2, amount:1298, status:"processing", date:"18 Jun 2026", address:"C Scheme, Jaipur" },
  { id:"RM-1021", customer:"Riya Verma",     initials:"RV", product:"Gota Patti Set — Blush Pink", qty:1, amount:429,  status:"delivered",  date:"17 Jun 2026", address:"Mansarovar, Jaipur" },
  { id:"RM-1020", customer:"Sonal Mehra",    initials:"SM", product:"Kundan Set — Deep Violet", qty:1, amount:349,   status:"delivered",  date:"16 Jun 2026", address:"Tonk Road, Jaipur" },
  { id:"RM-1019", customer:"Kavita Singh",   initials:"KS", product:"Mirror Work Set — Teal",   qty:1, amount:529,   status:"delivered",  date:"15 Jun 2026", address:"Sodala, Jaipur" },
  { id:"RM-1018", customer:"Deepa Rathore",  initials:"DR", product:"Stone Studded Set — Maroon", qty:1, amount:599,  status:"delivered",  date:"14 Jun 2026", address:"Raja Park, Jaipur" },
];

const SAMPLE_CUSTOMERS = [
  { id:1, name:"Priya Sharma",   initials:"PS", email:"priya.s@email.com",    phone:"+91 98765 43210", orders:3, spent:1547, date:"15 Jun 2026" },
  { id:2, name:"Ankit Kumar",    initials:"AK", email:"ankit.k@email.com",    phone:"+91 98123 45678", orders:1, spent:399,  date:"16 Jun 2026" },
  { id:3, name:"Neha Joshi",     initials:"NJ", email:"neha.j@email.com",     phone:"+91 99887 76655", orders:2, spent:1947, date:"14 Jun 2026" },
  { id:4, name:"Riya Verma",     initials:"RV", email:"riya.v@email.com",     phone:"+91 98234 56789", orders:1, spent:429,  date:"17 Jun 2026" },
  { id:5, name:"Sonal Mehra",    initials:"SM", email:"sonal.m@email.com",    phone:"+91 97654 32100", orders:2, spent:898,  date:"12 Jun 2026" },
  { id:6, name:"Kavita Singh",   initials:"KS", email:"kavita.s@email.com",   phone:"+91 99001 23456", orders:1, spent:529,  date:"15 Jun 2026" },
  { id:7, name:"Deepa Rathore",  initials:"DR", email:"deepa.r@email.com",    phone:"+91 98900 11223", orders:1, spent:599,  date:"14 Jun 2026" },
];

const DEFAULT_SETTINGS = {
  storeName: "Rang Mahal",
  tagline: "Handcrafted Lac Bangles from Jaipur",
  email: "hello@rangmahal.in",
  phone: "+91 98765 43210",
  address: "Johri Bazaar, Jaipur, Rajasthan",
  instagram: "",
  facebook: "",
  whatsapp: "",
  freeShippingMin: 999,
  giftPackagingPrice: 49,
};

const DB = {
  get(key, fallback) {
    const d = localStorage.getItem('rm_' + key);
    return d ? JSON.parse(d) : fallback;
  },
  set(key, val) {
    localStorage.setItem('rm_' + key, JSON.stringify(val));
  },
  products()  { return this.get('products', SAMPLE_PRODUCTS); },
  orders()    { return this.get('orders', SAMPLE_ORDERS); },
  customers() { return this.get('customers', SAMPLE_CUSTOMERS); },
  settings()  { return this.get('settings', DEFAULT_SETTINGS); },

  saveProducts(p)  { this.set('products', p); },
  saveOrders(o)    { this.set('orders', o); },
  saveCustomers(c) { this.set('customers', c); },
  saveSettings(s)  { this.set('settings', s); },

  nextProductId() {
    const products = this.products();
    return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  },
  nextOrderId() {
    const orders = this.orders();
    if (!orders.length) return 'RM-1001';
    const nums = orders.map(o => parseInt(o.id.replace('RM-','')));
    return 'RM-' + (Math.max(...nums) + 1);
  },

  stats() {
    const orders = this.orders();
    const products = this.products();
    const customers = this.customers();
    return {
      totalOrders: orders.length,
      revenue: orders.reduce((s, o) => s + o.amount, 0),
      totalProducts: products.filter(p => p.status === 'active').length,
      totalCustomers: customers.length,
    };
  }
};

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

const users = [
  {
    id: 1,
    name: "Jonh Alex",
    email: "jonh.alex@email.com",
    age: 20
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@email.com",
    age: 25
  },
  {
    id: 3,
    name: "Alice Smith",
    email: "alice.smith@email.com",
    age: 30
  },
]

const products = [
  {
    id: 1,
    name: "Smartphone Galaxy S23",
    price: 4500,
    category: "Electronics",
    stockQuantity: 10,
  },
  {
    id: 2,
    name: "Smartphone iPhone 14",
    price: 5000,
    category: "Electronics",
    stockQuantity: 5,
  },
  {
    id: 3,
    name: "Smartphone Motorola Edge 30",
    price: 3500,
    category: "Electronics",
    stockQuantity: 15,
  },
  {
    id: 4,
    name: "Notebook Dell Inspiron",
    price: 2000,
    category: "Informática",
    stockQuantity: 20,
  },
  {
    id: 5,
    name: "Fone de Ouvido Bluetooth",
    price: 1500,
    category: "Acessórios",
    stockQuantity: 8,
  },
]

const orders = [
  {
    id: 1,
    userId: 1,
    products: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
    totalValue: 9500,
    orderDate: "2025-04-01T10:30:00Z", // formato datetime
    status: "Entregue"
  },
  {
    id: 2,
    userId: 2,
    products: [
      {
        productId: 3,
        quantity: 1,
      },
      {
        productId: 4,
        quantity: 1,
      },
    ],
    totalValue: 5500,
    orderDate: "2025-04-02T12:00:00Z",
    status: "Em Processamento"
  },
  {
    id: 3,
    userId: 3,
    products: [
      {
        productId: 5,
        quantity: 2,
      },
    ],
    totalValue: 3000,
    orderDate: "2025-04-03T14:15:00Z",
    status: "Enviado"
  },
  {
    id: 4,
    userId: 1,
    products: [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 1,
      },
    ],
    totalValue: 8000,
    orderDate: "2025-04-04T09:45:00Z",
    status: "Entregue"
  },
  {
    id: 5,
    userId: 2,
    products: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 4,
        quantity: 2,
      },
    ],
    totalValue: 8500,
    orderDate: "2025-04-05T11:00:00Z",
    status: "Cancelado"
  },
]

module.exports = {
  users,
  products,
  orders,
}

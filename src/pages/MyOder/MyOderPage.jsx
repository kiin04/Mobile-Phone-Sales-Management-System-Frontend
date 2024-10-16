import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Typography } from 'antd';
import styled from 'styled-components';

// Dữ liệu giả
const mockOrderList = [
  {
    _id: 'ORDER001',
    totalPrice: 1500000,
    isPaid: false,
    isDelivered: false,
    createdAt: '2024-10-12',
    orderItems: [
      {
        name: 'iPhone 14',
        price: 1200000,
        quantity: 1,
        imageUrl: 'https://example.com/iphone14.jpg',
      },
      {
        name: 'Ốp lưng',
        price: 300000,
        quantity: 1,
        imageUrl: 'https://example.com/oplung.jpg',
      },
    ],
  },
  {
    _id: 'ORDER002',
    totalPrice: 2000000,
    isPaid: true,
    isDelivered: false,
    createdAt: '2024-10-10',
    orderItems: [
      {
        name: 'Samsung Galaxy S21',
        price: 2000000,
        quantity: 1,
        imageUrl: 'https://example.com/galaxys21.jpg',
      },
    ],
  },
];

// Styled Components
const OrderCard = styled(Card)`
  margin-bottom: 20px;
  .order-status {
    color: #f5222d;
  }
  .order-total {
    color: #fa541c;
    font-weight: bold;
  }
`;

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(mockOrderList);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2}>Đơn hàng của tôi</Typography.Title>
      {orders.map((order) => (
        <OrderCard key={order._id} bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Typography.Text strong>Trạng thái</Typography.Text>
              <div className="order-status">
                <p>Giao hàng: {order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}</p>
                <p>Thanh toán: {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
              </div>

              {order.orderItems.map((item, idx) => (
                <Row key={idx} gutter={[8, 8]} style={{ marginBottom: '10px' }}>
                  <Col span={4}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '100%', borderRadius: '4px' }}
                    />
                  </Col>
                  <Col span={20}>
                    <p>{item.name}</p>
                    <p>{item.price} VND</p>
                  </Col>
                </Row>
              ))}
            </Col>

            <Col span={8} style={{ textAlign: 'right' }}>
              <Typography.Text className="order-total">
                Tổng tiền: {order.totalPrice} VND
              </Typography.Text>
              <div style={{ marginTop: '10px' }}>
                <Button style={{ marginRight: '10px' }}>Hủy đơn hàng</Button>
                <Button type="primary">Xem chi tiết</Button>
              </div>
            </Col>
          </Row>
        </OrderCard>
      ))}
    </div>
  );
};

export default MyOrderPage;

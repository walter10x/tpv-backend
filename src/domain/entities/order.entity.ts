export class Order {
    constructor(
      public id: string,
      public userId: string,
      public items: OrderItem[],
      public total: number,
      public status: 'pending' | 'completed' | 'cancelled',
      public createdAt: Date,
      public updatedAt: Date,
    ) {}
  }
  
  export class OrderItem {
    constructor(
      public productId: string,
      public quantity: number,
      public price: number,
    ) {}
  }
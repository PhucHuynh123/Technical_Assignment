export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description?: string;
    category: string;
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    returnPolicy: string;
    tags: string[];
    minimumOrderQuantity: number;
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    meta?: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
    images?: string[];
  }
  
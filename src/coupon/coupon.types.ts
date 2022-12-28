export interface Data{
      couponCode:number,
      expiry: string,
      title: string,
      description: string[],
      paymentMode: string,
      discount: {
          percentage: string,
          amount: number,
      },
  }

  
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { usePlaceOrderMutation } from '@/src/api/order/orderApi';
import { useActions } from '@/src/hooks/store/useActions';
import { useTypedSelector } from '@/src/hooks/store/useTypedSelector';

export const useCheckout = () => {
  const { reset } = useActions();
  const [createPaymentMutate, { isLoading }] = usePlaceOrderMutation();
  const router = useRouter();
  const items = useTypedSelector((store) => store.cart.items);

  const createPayment = async () => {
    try {
      const order = items.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        productId: item.product.id,
        storeId: item.product.storeId!,
      }));
      const payment = await createPaymentMutate({ items: order }).unwrap();
      router.push(payment.confirmation.confirmation_url);
      reset();
    } catch {
      toast.error('Ошибка создания платежа');
    }
  };

  return { createPayment, isLoading };
};

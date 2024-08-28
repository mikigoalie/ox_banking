import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { Button } from '@/components/ui/button';
import { UnpaidInvoice } from '~/src/common/typings';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import { delay } from '@/utils/misc';
import { queryClient } from '@/main';
import { useModal } from '@/components/ModalsProvider';

const PayInvoiceModal: React.FC<{ invoice: UnpaidInvoice }> = ({ invoice }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  async function handlePayInvoice() {
    setIsLoading(true);

    const resp = await fetchNui('payInvoice', { invoiceId: invoice.id }, { data: true });

    await delay(500);

    if (!resp) {
      setIsLoading(false);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['invoices'] });

    setIsLoading(false);
    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <h2 className="border-b text-xl">Details</h2>
        <div>
          <p className="text-muted-foreground text-sm">Payment to</p>
          <p>{invoice.label}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Total</p>
          <p>{formatNumber(invoice.amount)}</p>
        </div>
      </div>
      <Button className="self-end" onClick={handlePayInvoice} disabled={isLoading}>
        {isLoading ? <SpinningLoader /> : 'Confirm payment'}
      </Button>
    </div>
  );
};

export default PayInvoiceModal;

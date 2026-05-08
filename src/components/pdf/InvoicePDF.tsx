type CompanyInfo = {
  name: string;
  address: string;
  phone: string;
};

type ClientInfo = {
  name: string;
  address: string;
};

type InvoiceItem = {
  id: string;
  label: string;
  quantity: number;
  unitPrice: number;
};

type BankInfo = {
  bankName: string;
  branchName: string;
  accountNo: string;
};

export type InvoicePDFProps = {
  type?: "invoice" | "estimate" | "delivery" | "receipt";
  companyInfo: CompanyInfo;
  clientInfo: ClientInfo;
  items: InvoiceItem[];
  taxRate: number;
  notes?: string;
  bankInfo?: BankInfo;
  showSeal?: boolean;
};

export function InvoicePDF({
  type = "invoice",
  companyInfo,
  clientInfo,
  items,
  taxRate,
  notes,
  bankInfo,
  showSeal = true,
}: InvoicePDFProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <article className="rounded border border-charcoal-black/10 bg-washi-white p-6 shadow-subtle-line">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-serif-jp text-2xl text-charcoal-black">{type.toUpperCase()}</h3>
        {showSeal ? <span className="rounded-full border border-red-copper px-3 py-1 text-xs text-red-copper">確認印</span> : null}
      </div>
      <p className="text-sm text-rust-iron">{companyInfo.name} / {companyInfo.address} / {companyInfo.phone}</p>
      <p className="mb-4 text-sm text-rust-iron">宛先: {clientInfo.name} ({clientInfo.address})</p>
      <table className="mb-4 min-w-full text-sm">
        <thead><tr className="border-b border-concrete-grey"><th className="py-2 text-left">品目</th><th>数量</th><th>単価</th><th className="text-right">金額</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-concrete-grey/50"><td className="py-2">{item.label}</td><td className="text-center">{item.quantity}</td><td className="text-center">¥{item.unitPrice.toLocaleString()}</td><td className="text-right">¥{(item.quantity * item.unitPrice).toLocaleString()}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="space-y-1 text-right text-sm">
        <p>小計: ¥{subtotal.toLocaleString()}</p>
        <p>税額 ({taxRate}%): ¥{Math.round(tax).toLocaleString()}</p>
        <p className="font-bold text-charcoal-black">合計: ¥{Math.round(total).toLocaleString()}</p>
      </div>
      {notes ? <p className="mt-3 text-xs text-rust-iron">備考: {notes}</p> : null}
      {bankInfo ? <p className="mt-2 text-xs text-rust-iron">振込先: {bankInfo.bankName} {bankInfo.branchName} {bankInfo.accountNo}</p> : null}
    </article>
  );
}

export default InvoicePDF;

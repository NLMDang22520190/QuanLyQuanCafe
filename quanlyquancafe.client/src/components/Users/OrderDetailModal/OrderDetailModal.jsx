import { Modal, Table } from "flowbite-react";
import { Package2, Receipt, StickyNote } from "lucide-react";

const OrderDetailModal = ({ show, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal dismissible show={show} onClose={onClose} size="2xl">
      <Modal.Header>Order Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Order Code</span>
              <h3 className="text-lg font-semibold">{order.id}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Total Amount</span>
              <h3 className="text-lg font-semibold">
                ${order.total.toFixed(2)}
              </h3>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package2 className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">Products</h4>
            </div>
            <Table>
              <Table.Head>
                <Table.HeadCell>Product</Table.HeadCell>
                <Table.HeadCell className="text-right">Quantity</Table.HeadCell>
                <Table.HeadCell className="text-right">Notes</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {order.products.map((product, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell className="text-right">
                      {product.quantity}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      {product.notes}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {order.promoCode && (
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-500" />
              <div>
                <span className="text-sm text-gray-500">
                  Applied Promo Code
                </span>
                <p className="font-medium">{order.promoCode}</p>
              </div>
            </div>
          )}

          {order.notes && (
            <div className="flex items-start gap-2">
              <StickyNote className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <span className="text-sm text-gray-500">Order Notes</span>
                <p className="font-medium">{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailModal;

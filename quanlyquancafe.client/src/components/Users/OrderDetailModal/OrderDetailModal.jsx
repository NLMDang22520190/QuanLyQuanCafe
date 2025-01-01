import { Modal, Table } from "flowbite-react";
import { Package2, Receipt, StickyNote } from "lucide-react";

const OrderDetailModal = ({ show, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal dismissible show={show} onClose={onClose} size="2xl">
      <Modal.Header>Chi tiết đơn hàng</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Mã đơn hàng</span>
              <h3 className="text-lg font-semibold">{order.id}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Tổng cộng</span>
              <h3 className="text-lg font-semibold">{order.total}</h3>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package2 className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">Sản phẩm</h4>
            </div>
            <Table>
              <Table.Head>
                <Table.HeadCell>Sản phẩm</Table.HeadCell>
                <Table.HeadCell className="text-right">Số lượng</Table.HeadCell>
                <Table.HeadCell className="text-right">Giá</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {order.products.map((product, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell className="text-right">
                      {product.quantity}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      {product.price}
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
                  Mã khuyến mãi áp dụng
                </span>
                <p className="font-medium">{order.promoCode}</p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailModal;

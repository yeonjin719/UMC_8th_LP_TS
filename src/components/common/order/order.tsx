import { TOrder } from '../../../constants/enum';
type TOrderComponentProps = {
    order: string;
    setOrder: (order: TOrder) => void;
};

const Order = ({ order, setOrder }: TOrderComponentProps) => {
    return (
        <div className="flex border-white border-[0.1px] rounded-md">
            <div
                className={`border-r-white border-r-[0.1px] px-4 py-1
                  ${
                      order === TOrder.LATEST
                          ? 'bg-white text-black rounded-tl-md rounded-bl-md'
                          : 'text-white'
                  }
                  `}
                onClick={() => setOrder(TOrder.LATEST)}
            >
                {TOrder.LATEST}
            </div>
            <div
                className={`px-4 py-1
              ${
                  order === TOrder.POPULAR
                      ? 'bg-white text-black rounded-tr-md rounded-br-md'
                      : 'text-white'
              }
              `}
                onClick={() => setOrder(TOrder.POPULAR)}
            >
                {TOrder.POPULAR}
            </div>
        </div>
    );
};
export default Order;

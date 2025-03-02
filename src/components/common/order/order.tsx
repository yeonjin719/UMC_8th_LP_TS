import { TOrder, TOrderLabel } from '../../../constants/enum';

type TOrderComponentProps = {
    order: TOrder; // order는 이제 TOrder 타입으로 사용됩니다.
    setOrder: (order: TOrder) => void; // setOrder는 TOrder 값을 설정합니다.
};

const Order = ({ order, setOrder }: TOrderComponentProps) => {
    return (
        <div className="flex border-white border-[0.1px] rounded-md">
            <div
                className={`border-r-white border-r-[0.1px] px-4 py-1
                  ${
                      order === TOrder.OLDEST_FIRST // TOrder 값으로 비교
                          ? 'bg-white text-black rounded-tl-md rounded-bl-md'
                          : 'text-white'
                  }
                  `}
                onClick={() => setOrder(TOrder.OLDEST_FIRST)} // '오래된순'에 해당하는 TOrder 값 설정
            >
                {TOrderLabel[TOrder.OLDEST_FIRST]} {/* 한글로 표시 */}
            </div>
            <div
                className={`px-4 py-1
              ${
                  order === TOrder.NEWEST_FIRST // TOrder 값으로 비교
                      ? 'bg-white text-black rounded-tr-md rounded-br-md'
                      : 'text-white'
              }
              `}
                onClick={() => setOrder(TOrder.NEWEST_FIRST)} // '최신순'에 해당하는 TOrder 값 설정
            >
                {TOrderLabel[TOrder.NEWEST_FIRST]} {/* 한글로 표시 */}
            </div>
        </div>
    );
};

export default Order;

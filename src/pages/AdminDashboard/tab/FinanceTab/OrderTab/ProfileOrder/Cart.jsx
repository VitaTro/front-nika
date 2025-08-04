// import { Typography } from "@mui/material";
// import {
//   CartContainer,
//   CartGrid,
//   ProductCardShop,
//   ProductImage,
//   ProductTitle,
// } from "./OfflineOrder.styled";

// const Cart = ({ cart, updateQuantity, removeFromCart, lastRetailPrice }) => {
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
//     0
//   );

//   return (
//     <CartContainer>
//       <Typography variant="h6">🛒 Кошик ({cart.length} товарів)</Typography>{" "}
//       {/* 🔥 Додаємо кількість */}
//       {cart.length > 0 ? (
//         <>
//           <CartGrid>
//             {cart.map((item, index) => (
//               <ProductCardShop key={item.productId}>
//                 <ProductImage src={item.photoUrl} alt={item.name} />
//                 <ProductTitle>{item.name}</ProductTitle>
//                 <Typography>
//                   Ціна: {item.price ? `${item.price}` : "—"} zł
//                 </Typography>
//                 <Typography>Кількість: {item.quantity}</Typography>
//                 <div>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.productId, item.quantity - 1)
//                     }
//                     disabled={item.quantity <= 1}
//                   >
//                     ➖
//                   </button>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.productId, item.quantity + 1)
//                     }
//                   >
//                     ➕
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.productId)}
//                   style={{ color: "red" }}
//                 >
//                   ❌ Видалити
//                 </button>
//               </ProductCardShop>
//             ))}
//           </CartGrid>
//           <Typography variant="h6">Загальна сума: {totalPrice} zł</Typography>{" "}
//         </>
//       ) : (
//         <Typography>⚠️ Кошик порожній</Typography>
//       )}
//     </CartContainer>
//   );
// };

// export default Cart;

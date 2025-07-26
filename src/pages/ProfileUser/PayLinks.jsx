// список заздалегідь згенерованих лінків
export const payLinks = {
  basic: "https://hpp.eu.convergepay.com?pl=kpp2qjghrhkg3t3v9xpx23f6p3xt", // 1 PLN
  premium: "https://hpp.eu.convergepay.com?pl=xxxxxx", // 10 PLN
  vip: "https://hpp.eu.convergepay.com?pl=yyyyyy", // 50 PLN
};

// функція редиректу
export function redirectToPayment(linkKey) {
  const link = payLinks[linkKey];
  if (!link) {
    console.error("Link nie znaleziono dla klucza:", linkKey);
    return;
  }
  window.location.href = link;
}

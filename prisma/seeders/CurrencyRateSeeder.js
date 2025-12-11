export default async function run(prisma) {
  const data = [
    { code: 'USD', buy: 15800.5, sell: 16020.75, flagSrc: 'https://flagcdn.com/w320/us.png' },
    { code: 'EUR', buy: 16850.9, sell: 17010.35, flagSrc: 'https://flagcdn.com/w320/eu.png' },
    { code: 'JPY', buy: 105.2, sell: 106.1, flagSrc: 'https://flagcdn.com/w320/jp.png' },
    { code: 'SGD', buy: 11850.0, sell: 11980.0, flagSrc: 'https://flagcdn.com/w320/sg.png' },
    { code: 'AUD', buy: 10250.4, sell: 10400.8, flagSrc: 'https://flagcdn.com/w320/au.png' },
    { code: 'GBP', buy: 19800.9, sell: 20050.3, flagSrc: 'https://flagcdn.com/w320/gb.png' },
    { code: 'CNY', buy: 2200.1, sell: 2250.4, flagSrc: 'https://flagcdn.com/w320/cn.png' },
    { code: 'HKD', buy: 2020.7, sell: 2055.1, flagSrc: 'https://flagcdn.com/w320/hk.png' },
    { code: 'KRW', buy: 12.1, sell: 12.6, flagSrc: 'https://flagcdn.com/w320/kr.png' },
    { code: 'MYR', buy: 3300.2, sell: 3360.7, flagSrc: 'https://flagcdn.com/w320/my.png' },
  ];
  await prisma.currencyRate.deleteMany({});
  await prisma.currencyRate.createMany({ data });
}


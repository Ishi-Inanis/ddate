const { Ddate } = require('../src/ddate');

// const { describe, test, expect } = require('@jest/globals');

const dictionary = {
  ru: {
    texts: {
      nothing_say: 'Мне нечего тебе сказать. (Пока что)',
    },
    seasons: [
      { l: 'Хаоса', s: 'ХС' },
      { l: 'Раздора', s: 'РЗ' },
      { l: 'Замешательства', s: 'ЗМ' },
      { l: 'Бюрократии', s: 'БР' },
      { l: 'Последствий', s: 'ПС' },
    ],
    weekday: [
      { l: 'Сладник', s: 'СЛ' },
      { l: 'Взрывник', s: 'ВЗ' },
      { l: 'Остреда', s: 'ОС' },
      { l: 'Колючка-колючка', s: 'КК' },
      { l: 'Апельсинница', s: 'АП' },
    ],
    apostle: [
      'День Св. Мунга',
      'День Св. Моджо',
      'День Св. Сьядасти',
      'День Св. Заратуда',
      'День Св. Малаклипса',
    ],
    holiday: ['Хаосец', 'Раздинец', 'Неразделень', 'Бюрокрадень', 'Итогец'],
    errors: {
      wrong_type: 'Параметр должен быть типа Date',
    },
    tibsDay: 'День святого Тиба'
  },
  en: {
    texts: {
      nothing_say: "I've nothing to say to you. (yet)",
    },
    seasons: [
      { l: 'Chaos', s: 'Chs' },
      { l: 'Discord', s: 'Dsc' },
      { l: 'Confusion', s: 'Cfn' },
      { l: 'Bureaucracy', s: 'Bcy' },
      { l: 'The Aftermath', s: 'Afm' },
    ],
    weekday: [
      { l: 'Sweetmorn', s: 'SM' },
      { l: 'Boomtime', s: 'BT' },
      { l: 'Pungenday', s: 'PD' },
      { l: 'Prickle-Prickle', s: 'PP' },
      { l: 'Setting Orange', s: 'SO' },
    ],
    apostle: ['Mungday', 'Mojoday', 'Syaday', 'Zaraday', 'Maladay'],
    holiday: ['Chaoflux', 'Discoflux', 'Confuflux', 'Bureflux', 'Afflux'],
    errors: {
      wrong_type: 'Parameter was not of type Date',
    },
    tibsDay: "St. Tib's Day"
  },
};

const holidays = {
  5: [
    { month: 0, day: 5 },
    { month: 2, day: 19 },
    { month: 4, day: 31 },
    { month: 7, day: 12 },
    { month: 9, day: 24 },
  ],
  50: [
    { month: 1, day: 19 },
    { month: 4, day: 3 },
    { month: 6, day: 15 },
    { month: 8, day: 26 },
    { month: 11, day: 8 },
  ],
  tibsDay: {
    month: 1,
    day: 29
  }
}

// TODO: describe the tests in more detail
describe('Ddate', () => {
  const ddate = new Ddate(new Date(2023, 1, 17)),
    ddateEn = new Ddate(new Date(2023, 1, 17), 'en'),
    ddateRu = new Ddate(new Date(2023, 1, 17), 'ru'),
    tibsDay = new Date(2020, 1, 29);

  describe('Non static', () => {
    describe('Properties', () => {
      test('initialize', () => {
        expect(ddate instanceof Ddate).toBeTruthy();
        expect(ddateEn instanceof Ddate).toBeTruthy();
        expect(ddateRu instanceof Ddate).toBeTruthy();
      });

      describe('locale', () => {
        test('default', () => {
          expect(ddate.locale).toEqual('en');
        });

        test('en', () => {
          expect(ddateEn.locale).toEqual('en');
        });

        test('ru', () => {
          expect(ddateRu.locale).toEqual('ru');
        });
      });

      test('today', () => {
        expect(ddate.today instanceof Date).toBeTruthy();
        expect(ddate.today).toEqual(new Date(2023, 1, 17));
      });

      test('text', () => {
        expect(ddate.discordianDate().text).toEqual('Today is Pungenday, the 48th day of Chaos in the YOLD 3189.');
      });
    });

    describe('Methods', () => {
      test('isToday', () => {
        expect(ddate.isToday(new Date(2023, 1, 17))).toBeTruthy();
        expect(ddate.isToday(new Date(2023, 1, 18))).toBeFalsy();
      });

      describe('discordianDate', () => {
        describe('default', () => {
          const locale = null,
            langDict = dictionary[locale ?? 'en'];

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(langDict.tibsDay);
              });
            });
          });
        });

        describe('en', () => {
          const locale = 'en',
            langDict = dictionary[locale ?? 'en'];

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(langDict.tibsDay);
              });
            });
          });
        });

        describe('ru', () => {
          const locale = 'ru',
            langDict = dictionary[locale ?? 'en'];

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).discordianDate().celebrateHoliday).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).discordianDate().celebrateHoliday).toEqual(langDict.tibsDay);
              });
            });
          });
        });
      });

      describe('format', () => {
        describe('default', () => {
          const locale = null,
            langDict = dictionary[locale ?? 'en'];

          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay);

            expect(ddate.format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
            expect(new Ddate(tibsDay, 'en').format('Today is %{%A, the %e of %B%}, %Y.')).toEqual("Today is St. Tib's Day, 3186.");
            expect(new Ddate(new Date(2021, 0, 5), 'en').format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Setting Orange, the 5th of Chaos, 3187.\nCelebrate Mungday');

            expect(ddateTest.format('%A')).toEqual('Setting Orange');
            expect(ddateTest.format('%a')).toEqual('SO');
            expect(ddateTest.format('%B')).toEqual('Chaos');
            expect(ddateTest.format('%b')).toEqual('Chs');
            expect(new Ddate(new Date(2020, 3, 29)).format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29)).format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60th');
            expect(ddateTest.format('%H')).toEqual("St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29)).format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('Holiday: %{%H')).toEqual("Holiday: St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29)).format('Holiday: %{%H')).toEqual('Holiday: ');
            expect(ddateTest.format('%.')).toEqual("I've nothing to say to you. (yet)");
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual(langDict.tibsDay);
              });
            });
          });
        });

        describe('en', () => {
          const locale = null,
            langDict = dictionary[locale ?? 'en'];

          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay, 'en');

            expect(ddateEn.format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
            expect(ddateTest.format('Today is %{%A, the %e of %B%}, %Y.')).toEqual("Today is St. Tib's Day, 3186.");
            expect(new Ddate(new Date(2021, 0, 5), 'en').format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Setting Orange, the 5th of Chaos, 3187.\nCelebrate Mungday');

            expect(ddateTest.format('%A')).toEqual('Setting Orange');
            expect(ddateTest.format('%a')).toEqual('SO');
            expect(ddateTest.format('%B')).toEqual('Chaos');
            expect(ddateTest.format('%b')).toEqual('Chs');
            expect(new Ddate(new Date(2020, 3, 29), 'en').format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29), 'en').format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60th');
            expect(ddateTest.format('%H')).toEqual("St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29), 'en').format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('Holiday: %{%H')).toEqual("Holiday: St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29), 'en').format('Holiday: %{%H')).toEqual('Holiday: ');
            expect(ddateTest.format('%.')).toEqual("I've nothing to say to you. (yet)");
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual(langDict.tibsDay);
              });
            });
          });
        });

        describe('ru', () => {
          const locale = null,
            langDict = dictionary[locale ?? 'en'];

          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay, 'ru')

            expect(ddateRu.format('Сегодня %{%A, %e день %B%}, %Y.%N%nПраздник %H')).toEqual('Сегодня Остреда, 48й день Хаоса, 3189.');
            expect(new Ddate(tibsDay, 'ru').format('Сегодня %{%A, %e день %B%}, %Y.')).toEqual('Сегодня День святого Тиба, 3186.');
            expect(new Ddate(new Date(2021, 0, 5), 'ru').format('Сегодня %{%A, %e день %B%}, %Y.%N%nПраздник %H')).toEqual('Сегодня Апельсинница, 5й день Хаоса, 3187.\nПраздник День Св. Мунга');

            expect(ddateTest.format('%A')).toEqual('Апельсинница');
            expect(ddateTest.format('%a')).toEqual('АП');
            expect(ddateTest.format('%B')).toEqual('Хаоса');
            expect(ddateTest.format('%b')).toEqual('ХС');
            expect(new Ddate(new Date(2020, 3, 29), 'ru').format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29), 'ru').format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60й');
            expect(ddateTest.format('%H')).toEqual('День святого Тиба');
            expect(new Ddate(new Date(2021, 1, 29), 'ru').format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('%{%H')).toEqual('День святого Тиба');
            expect(new Ddate(new Date(2021, 1, 29), 'ru').format('%{%H')).toEqual('');
            expect(ddateTest.format('%.')).toEqual('Мне нечего тебе сказать. (Пока что)');
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe(`Holidays`, () => {
            describe('5', () => {
              for (const date in holidays[5]) {
                test(`Not Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });

                test(`Leap Year - ${langDict.apostle[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[5][date].month, holidays[5][date].day), locale).format('%H')).toEqual(langDict.apostle[date]);
                });
              }
            });

            describe('50', () => {
              for (const date in holidays[50]) {
                test(`Not Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2021, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });

                test(`Leap Year - ${langDict.holiday[date]}`, () => {
                  expect(new Ddate(new Date(2020, holidays[50][date].month, holidays[50][date].day), locale).format('%H')).toEqual(langDict.holiday[date]);
                });
              }
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, holidays.tibsDay.month, holidays.tibsDay.day), locale).format('%H')).toEqual(langDict.tibsDay);
              });
            });
          });
        });
      });
    });

    describe('_numberize', () => {
      test('default', () => {
        expect(ddate._numberize('1')).toEqual('1st');
        expect(ddate._numberize('2')).toEqual('2nd');
        expect(ddate._numberize('3')).toEqual('3rd');
        expect(ddate._numberize('4')).toEqual('4th');
        expect(ddate._numberize('48')).toEqual('48th');
        expect(ddate._numberize('51')).toEqual('51st');
      });

      test('en', () => {
        expect(ddateEn._numberize('1')).toEqual('1st');
        expect(ddateEn._numberize('2')).toEqual('2nd');
        expect(ddateEn._numberize('3')).toEqual('3rd');
        expect(ddateEn._numberize('4')).toEqual('4th');
        expect(ddateEn._numberize('48')).toEqual('48th');
        expect(ddateEn._numberize('51')).toEqual('51st');
      });

      test('ru', () => {
        expect(ddateRu._numberize('48')).toEqual('48й');
      });
    });
  });

  describe('Static', () => {
    describe('Properties', () => {
      test('dictionary', () => {

      });

      test('dayCount', () => {

      });
    });

    describe('Methods', () => {
      test('isLeapYear', () => {
        expect(Ddate.isLeapYear(ddate.today)).toBeFalsy();
        expect(Ddate.isLeapYear(new Date(2020, 1, 1))).toBeTruthy();
      });

      test('getDayOfYear', () => {
        expect(Ddate.getDayOfYear(new Date(2023, 1, 17))).toEqual(48);
        expect(Ddate.getDayOfYear(new Date(2020, 2, 1))).toEqual(60);
      });
    });
  });
});



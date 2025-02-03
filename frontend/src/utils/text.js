export const formatQuantity = (value) => {
  if (value == null) return '';

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (typeof value === 'string') {
    const match = value.match(/^(\d+(\.\d+)?)(-(\d+(\.\d+)?))?/);

    if (match) {
      const firstNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: match[2] ? 2 : 0,
        maximumFractionDigits: 2,
      }).format(parseFloat(match[1]));

      if (match[4]) {
        const secondNumber = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: match[5] ? 2 : 0,
          maximumFractionDigits: 2,
        }).format(parseFloat(match[4]));

        return value
          .replace(match[1], firstNumber)
          .replace(match[4], secondNumber);
      }

      return value.replace(match[1], firstNumber);
    }
  }

  return value;
};

export const cleanNumber = (input) =>
  parseFloat((input || '0').toString().replace(/[^0-9.]/g, ''));

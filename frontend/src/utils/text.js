export const formatQuantity = (value) => {
  if (value == null) return '';

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US').format(value);
  }

  if (typeof value === 'string') {
    const match = value.match(/^(\d+)(-(\d+))?/);

    if (match) {
      const firstNumber = new Intl.NumberFormat('en-US').format(
        parseInt(match[1], 10)
      );

      if (match[3]) {
        const secondNumber = new Intl.NumberFormat('en-US').format(
          parseInt(match[3], 10)
        );
        return value
          .replace(match[1], firstNumber)
          .replace(match[3], secondNumber);
      }

      return value.replace(match[1], firstNumber);
    }
  }

  return value;
};

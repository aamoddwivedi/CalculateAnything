// Reusable conversion engine: define base-unit factors once, convert any-to-any.

export const unitCategories = {
  length: {
    label: 'Length',
    base: 'm',
    units: {
      mm: 0.001, cm: 0.01, m: 1, km: 1000,
      inch: 0.0254, feet: 0.3048, yard: 0.9144, mile: 1609.344,
    },
  },
  weight: {
    label: 'Weight',
    base: 'kg',
    units: {
      mg: 0.000001, g: 0.001, kg: 1, tonne: 1000,
      pound: 0.453592, ounce: 0.0283495,
    },
  },
  area: {
    label: 'Area',
    base: 'sqm',
    units: {
      sqmm: 0.000001, sqcm: 0.0001, sqm: 1, hectare: 10000, sqkm: 1000000,
      sqft: 0.092903, sqyard: 0.836127, acre: 4046.86,
    },
  },
  volume: {
    label: 'Volume',
    base: 'l',
    units: {
      ml: 0.001, l: 1, cubicm: 1000,
      gallon: 3.78541, quart: 0.946353, pint: 0.473176, cup: 0.24,
    },
  },
  speed: {
    label: 'Speed',
    base: 'mps',
    units: {
      mps: 1, kmph: 0.277778, mph: 0.44704, knot: 0.514444,
    },
  },
  data: {
    label: 'Data Storage',
    base: 'byte',
    units: {
      bit: 0.125, byte: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3, tb: 1024 ** 4,
    },
  },
  time: {
    label: 'Time',
    base: 'second',
    units: {
      millisecond: 0.001, second: 1, minute: 60, hour: 3600,
      day: 86400, week: 604800, month: 2629800, year: 31557600,
    },
  },
}

export function convertUnit(category, value, fromUnit, toUnit) {
  const def = unitCategories[category]
  if (!def) throw new Error(`Unknown category: ${category}`)
  const { units } = def
  if (!(fromUnit in units) || !(toUnit in units)) {
    throw new Error('Unknown unit for this category')
  }
  const baseValue = value * units[fromUnit]
  return baseValue / units[toUnit]
}

// Temperature needs offset math, not a simple factor, so it stays separate.
export function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value
  let celsius
  if (fromUnit === 'celsius') celsius = value
  else if (fromUnit === 'fahrenheit') celsius = (value - 32) * (5 / 9)
  else if (fromUnit === 'kelvin') celsius = value - 273.15
  else throw new Error('Unknown temperature unit')

  if (toUnit === 'celsius') return celsius
  if (toUnit === 'fahrenheit') return celsius * (9 / 5) + 32
  if (toUnit === 'kelvin') return celsius + 273.15
  throw new Error('Unknown temperature unit')
}

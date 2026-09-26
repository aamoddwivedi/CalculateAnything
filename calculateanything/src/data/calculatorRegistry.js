import { lazy } from 'react'

// Central registry: every calculator is registered once here, and everything
// else (routing, search, category pages, related calculators, homepage
// "popular" picks) reads from this single source of truth.

export const calculatorRegistry = [
  // ---------------- Education ----------------
  {
    id: 'cgpa-to-percentage',
    name: 'CGPA to Percentage',
    category: 'education',
    description: 'Convert your CGPA to an estimated percentage using a configurable multiplier.',
    keywords: ['cgpa', 'percentage', 'college', 'university', 'grade', 'aktu'],
    component: lazy(() => import('../calculators/education/CgpaToPercentage.jsx')),
  },
  {
    id: 'percentage-to-cgpa',
    name: 'Percentage to CGPA',
    category: 'education',
    description: 'Estimate CGPA from a percentage using a configurable divisor.',
    keywords: ['percentage', 'cgpa', 'college', 'grade'],
    component: lazy(() => import('../calculators/education/PercentageToCgpa.jsx')),
  },
  {
    id: 'sgpa-calculator',
    name: 'SGPA Calculator',
    category: 'education',
    description: 'Work out semester SGPA from each subject\u2019s credits and grade point.',
    keywords: ['sgpa', 'gpa', 'semester', 'college', 'credits'],
    component: lazy(() => import('../calculators/education/SgpaCalculator.jsx')),
  },
  {
    id: 'attendance-calculator',
    name: 'Attendance Calculator',
    category: 'education',
    description: 'See your current attendance and how many classes you can safely miss.',
    keywords: ['attendance', 'classes', 'college', 'bunk'],
    component: lazy(() => import('../calculators/education/AttendanceCalculator.jsx')),
  },
  {
    id: 'marks-percentage',
    name: 'Marks Percentage Calculator',
    category: 'education',
    description: 'Convert marks obtained out of a maximum into a percentage.',
    keywords: ['marks', 'percentage', 'exam', 'result'],
    component: lazy(() => import('../calculators/education/MarksPercentage.jsx')),
  },
  // ---------------- Finance ----------------
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    category: 'finance',
    description: 'Calculate simple interest and total repayment amount.',
    keywords: ['interest', 'simple interest', 'loan', 'finance'],
    component: lazy(() => import('../calculators/finance/SimpleInterest.jsx')),
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'finance',
    description: 'See how your money grows with compounding, with a year-by-year chart.',
    keywords: ['compound', 'interest', 'investment', 'growth'],
    component: lazy(() => import('../calculators/finance/CompoundInterest.jsx')),
  },
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    description: 'Monthly EMI, total interest and a principal-vs-interest breakdown.',
    keywords: ['emi', 'loan', 'installment', 'mortgage'],
    component: lazy(() => import('../calculators/finance/EmiCalculator.jsx')),
  },
  {
    id: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    description: 'Project the future value of a monthly SIP investment.',
    keywords: ['sip', 'mutual fund', 'investment', 'compound'],
    component: lazy(() => import('../calculators/finance/SipCalculator.jsx')),
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    category: 'finance',
    description: 'Add or remove GST from an amount.',
    keywords: ['gst', 'tax', 'invoice'],
    component: lazy(() => import('../calculators/finance/GstCalculator.jsx')),
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'finance',
    description: 'Work out the final price and savings after a discount.',
    keywords: ['discount', 'sale', 'price', 'off'],
    component: lazy(() => import('../calculators/finance/DiscountCalculator.jsx')),
  },
  {
    id: 'profit-loss',
    name: 'Profit & Loss Calculator',
    category: 'finance',
    description: 'Find profit or loss and the percentage on any sale.',
    keywords: ['profit', 'loss', 'cost price', 'selling price'],
    component: lazy(() => import('../calculators/finance/ProfitLoss.jsx')),
  },
  // ---------------- Mathematics ----------------
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    description: 'X% of Y, percentage increase, decrease and difference — all in one.',
    keywords: ['percentage', 'percent', 'increase', 'decrease'],
    component: lazy(() => import('../calculators/math/PercentageCalculator.jsx')),
  },
  {
    id: 'quadratic-equation',
    name: 'Quadratic Equation Calculator',
    category: 'math',
    description: 'Solve ax\u00b2 + bx + c = 0 with a full step-by-step breakdown.',
    keywords: ['quadratic', 'equation', 'roots', 'algebra'],
    component: lazy(() => import('../calculators/math/QuadraticEquation.jsx')),
  },
  {
    id: 'lcm-hcf',
    name: 'LCM & HCF Calculator',
    category: 'math',
    description: 'Find the LCM and HCF (GCD) of a list of numbers.',
    keywords: ['lcm', 'hcf', 'gcd', 'factors'],
    component: lazy(() => import('../calculators/math/LcmHcf.jsx')),
  },
  {
    id: 'average-calculator',
    name: 'Average Calculator',
    category: 'math',
    description: 'Mean, median and mode of any list of numbers.',
    keywords: ['average', 'mean', 'median', 'mode', 'statistics'],
    component: lazy(() => import('../calculators/math/AverageCalculator.jsx')),
  },
  // ---------------- Time & Date ----------------
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'time',
    description: 'Exact age in years, months and days, plus your next birthday.',
    keywords: ['age', 'birthday', 'date of birth', 'dob'],
    component: lazy(() => import('../calculators/time/AgeCalculator.jsx')),
  },
  {
    id: 'date-difference',
    name: 'Date Difference Calculator',
    category: 'time',
    description: 'Days, weeks and months between two dates.',
    keywords: ['date', 'difference', 'days between'],
    component: lazy(() => import('../calculators/time/DateDifference.jsx')),
  },
  // ---------------- Health ----------------
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    description: 'Body Mass Index with category and a visual scale. Not a diagnosis.',
    keywords: ['bmi', 'weight', 'health', 'fitness'],
    component: lazy(() => import('../calculators/health/BmiCalculator.jsx')),
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    description: 'Estimated Basal Metabolic Rate using the Mifflin-St Jeor formula.',
    keywords: ['bmr', 'metabolism', 'calories'],
    component: lazy(() => import('../calculators/health/BmrCalculator.jsx')),
  },
  // ---------------- Project Management ----------------
  {
    id: 'pert-calculator',
    name: 'PERT Calculator',
    category: 'pm',
    description: 'Expected time and variance from optimistic, likely and pessimistic estimates.',
    keywords: ['pert', 'project management', 'expected time', 'variance'],
    component: lazy(() => import('../calculators/pm/PertCalculator.jsx')),
  },
  // ---------------- Computer Science ----------------
  {
    id: 'binary-decimal',
    name: 'Binary / Decimal Converter',
    category: 'cs',
    description: 'Convert between binary, decimal, octal and hexadecimal.',
    keywords: ['binary', 'decimal', 'hex', 'octal', 'number system'],
    component: lazy(() => import('../calculators/cs/BinaryDecimal.jsx')),
  },
  {
    id: 'subnet-calculator',
    name: 'IPv4 Subnet Calculator',
    category: 'cs',
    description: 'Network address, broadcast address, host range and count from an IP/CIDR.',
    keywords: ['subnet', 'ip', 'cidr', 'network', 'networking'],
    component: lazy(() => import('../calculators/cs/SubnetCalculator.jsx')),
  },
  // ---------------- Unit Converter ----------------
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'converter',
    description: 'Length, weight, area, volume, speed, data and time — one converter engine.',
    keywords: ['unit', 'converter', 'length', 'weight', 'temperature', 'speed', 'data'],
    component: lazy(() => import('../calculators/converter/UnitConverter.jsx')),
  },
]

export function getCalculator(id) {
  return calculatorRegistry.find((c) => c.id === id)
}

export function getByCategory(categoryId) {
  return calculatorRegistry.filter((c) => c.category === categoryId)
}

export function searchCalculators(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return calculatorRegistry.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.includes(q))
  )
}

export function getRelated(calculator, limit = 3) {
  return calculatorRegistry
    .filter((c) => c.category === calculator.category && c.id !== calculator.id)
    .slice(0, limit)
}

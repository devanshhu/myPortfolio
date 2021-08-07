module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html'],
    safelist:[
        'bg-yellow-500',
        'border-yellow-500',
        'border-pink-700',
        'bg-pink-700',
        'bg-indigo-300',
        'bg-pink-500',
        'border-indigo-300',
        'border-pink-500',
        'bg-blue-500',
        'border-blue-500'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      height: ['group-hover'],
      margin : ['group-hover']

    },
  },
  plugins: [],
}

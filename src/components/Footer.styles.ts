import { createStyles } from '@mantine/core'

export default createStyles(() => ({
  footer: {
    margin: '0 auto',
    display: 'flex',
    userSelect: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 700,
    color: 'white',
    padding: '24px 0',
  },

  name: {
    display: 'block',
    lineHeight: '20px',
  },
}))

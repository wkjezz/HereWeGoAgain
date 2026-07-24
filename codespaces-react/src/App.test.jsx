import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the button and increments the counter when clicked', async () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /oh shit\.\.\. here we go again/i })
    expect(button).toBeInTheDocument()

    await userEvent.click(button)
    expect(screen.getByText(/interruptions: 1/i)).toBeInTheDocument()

    await userEvent.click(button)
    expect(screen.getByText(/interruptions: 2/i)).toBeInTheDocument()
  })
})

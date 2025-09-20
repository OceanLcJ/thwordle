import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import App from "./App.svelte"

jest.mock("svelte", () => {
  const originalModule = jest.requireActual("svelte")

  return {
    // __esModule: true,
    ...originalModule,
    onMount: jest.fn((args) => console.log("onMount called", args)),
  }
})

it("works", () => {
  const { container } = render(App, {})
  const mainTitle = container.querySelector('h1')
  expect(mainTitle).toBeInTheDocument()
  expect(mainTitle).toHaveTextContent("Thwordle")
})

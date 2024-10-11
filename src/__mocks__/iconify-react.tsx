/**
 * Mocks the Iconify React component.
 */
export default jest.mock('@iconify/react', () => ({
    Icon: () => (<div />),
}));
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRemixStub } from '@remix-run/testing';
import EnvironmentDashboard, { loader } from './index';
import { getEnvironments } from '../../services/environments';

// Mock the environment services
jest.mock('../../services/environments', () => ({
  getEnvironments: jest.fn(),
}));

describe('EnvironmentDashboard', () => {
  const mockEnvironments = [
    {
      id: '1',
      name: 'Development',
      description: 'Development environment',
      isDefault: true,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: '2',
      name: 'Staging',
      description: 'Staging environment',
      isDefault: false,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getEnvironments as jest.Mock).mockResolvedValue(mockEnvironments);
  });

  it('renders the environments list', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: EnvironmentDashboard,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Environments')).toBeInTheDocument();
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('Staging')).toBeInTheDocument();
    });
  });

  it('shows create form when button is clicked', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: EnvironmentDashboard,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Create Environment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create Environment'));

    await waitFor(() => {
      expect(screen.getByText('Create New Environment')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });
  });

  it('filters environments by search term', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: EnvironmentDashboard,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('Staging')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search environments...');
    fireEvent.change(searchInput, { target: { value: 'dev' } });

    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.queryByText('Staging')).not.toBeInTheDocument();
    });
  });

  it('shows empty state when no environments are found', async () => {
    (getEnvironments as jest.Mock).mockResolvedValue([]);

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: EnvironmentDashboard,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('No environments found. Create one to get started.')).toBeInTheDocument();
    });
  });

  it('shows no results message when search has no matches', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: EnvironmentDashboard,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search environments...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No environments found matching "nonexistent"')).toBeInTheDocument();
    });
  });
});

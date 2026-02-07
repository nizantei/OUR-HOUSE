import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  roomName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.roomName || 'room'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-warmth-50 px-4">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="font-decorative text-2xl text-warmth-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-warmth-600 mb-6">
              {this.props.roomName
                ? `The ${this.props.roomName} encountered an issue.`
                : 'Something unexpected happened.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-warmth-500 hover:bg-warmth-700 text-white rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

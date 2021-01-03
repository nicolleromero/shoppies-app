import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

// Source: https://reactjs.org/docs/concurrent-mode-suspense.html#handling-errors
export class ErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

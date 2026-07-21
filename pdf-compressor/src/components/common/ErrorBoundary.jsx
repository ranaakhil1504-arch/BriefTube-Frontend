import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Oops! Something went wrong</h2>
          <p className="mb-4 text-slate-600">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
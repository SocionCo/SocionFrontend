import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }


  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, [500]);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
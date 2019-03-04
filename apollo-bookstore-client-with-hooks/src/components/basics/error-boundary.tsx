import React from 'react';

export interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    message?: string;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false
    };

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            message: error.message ? error.message : 'Something went wrong'
        };
    }

    componentDidCatch(error: any, info: any) {
        // Log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.error(`error: ${error.message} info: ${info}`);
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.message}</h1>;
        }

        return this.props.children;
    }
}
